import { PUBLIC_PRODUCTION } from "$lib/function_utilities/production_state";
import { PASSPHRASE } from "$env/static/private";
import crypto from "node:crypto";
import dns from "node:dns";
import { PayfastValidationError } from "$lib/errors/payfast/payfast_errors";
import { InternalServerError } from "$lib/errors/server/server_errors";

export async function validateITN(
  data: Record<string, string>,
  requestHeaders: Headers
): Promise<void> {
  const pfHost = !PUBLIC_PRODUCTION
    ? "sandbox.payfast.co.za"
    : "www.payfast.co.za";

  const MAX_CHARGE_AMOUNT = 2000; //R2000

  //Conduct the four checks to make sure the request is from a valid payfast server.

  //1. Verify signature
  let pfParamString = "";
  for (let key in data) {
    if (data.hasOwnProperty(key) && key !== "signature") {
      pfParamString += `${key}=${encodeURIComponent(data[key].trim()).replace(
        /%20/g,
        "+"
      )}&`;
    }
  }

  // Remove last ampersand
  pfParamString = pfParamString.slice(0, -1);

  const pfValidSignature = () => {
    // Calculate security signature

    if (PASSPHRASE !== null) {
      pfParamString += `&passphrase=${encodeURIComponent(
        PASSPHRASE.trim()
      ).replace(/%20/g, "+")}`;
    }

    const signature = crypto
      .createHash("md5")
      .update(pfParamString)
      .digest("hex");

    if (signature !== data["signature"])
      throw new PayfastValidationError("Invalid ITN signature.");
  };

  //2. Validate domain

  async function ipLookup(domain: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      dns.lookup(
        domain,
        { all: true },
        (err: NodeJS.ErrnoException | null, address: dns.LookupAddress[]) => {
          if (err) {
            reject(err);
          } else {
            const addressIps = address.map(function (item) {
              return item.address;
            });
            resolve(addressIps);
          }
        }
      );
    });
  }

  const pfValidIP = async () => {
    const validHosts = [
      "www.payfast.co.za",
      "sandbox.payfast.co.za",
      "w1w.payfast.co.za",
    ];

    let validIps: string[] = [];
    const pfIp = requestHeaders.get("x-forwarded-for") || "";

    try {
      for (let key in validHosts) {
        const ips = await ipLookup(validHosts[key]);
        validIps = [...validIps, ...ips];
      }
    } catch (err) {
      throw new InternalServerError("IP lookup using node:dns failed.", "{'error_message' : 'IP lookup using node:dns failed'" , {cause: err});
    }

    const uniqueIps = [...new Set(validIps)];

    if (!uniqueIps.includes(pfIp)) {
      throw new PayfastValidationError("The origin IP of the ITN was not found in the list of valid IPs.");
    }
  };

  //3. For safety, check the charge amount is not above MAX_CHARGE_AMOUNT
  const pfValidPaymentData = () => {
    if (parseFloat(data["amount_gross"]) > MAX_CHARGE_AMOUNT)
      throw new PayfastValidationError("Charge amount should be 0 when registering a new card.");
  };

  //4. Query payfast servers to make sure that the recieved data exists on their server

  async function streamToString(readableStream: ReadableStream) {
    const reader = readableStream.getReader();
    const decoder = new TextDecoder(); // Decodes the stream chunks into text
    let result = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break; // Exit when the stream ends
      result += decoder.decode(value, { stream: true }); // Decode and append the chunk
    }

    // Flush any remaining bytes
    result += decoder.decode();
    return result;
  }

  const pfValidServerConfirmation = async () => {
    
      const resultF = await fetch(`https://${pfHost}/eng/query/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: pfParamString,
      });

      const result = await streamToString(resultF.body as ReadableStream);

      if (result !== "VALID") throw new PayfastValidationError("PayFast could not corroborate the ITN information.");
    
  };

  pfValidSignature();
  await pfValidIP();
  pfValidPaymentData();
  await pfValidServerConfirmation();
}
