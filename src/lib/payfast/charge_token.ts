import crypto from "node:crypto";
import { PASSPHRASE } from "$env/static/private";

type ChargeRequestParams = {
  token: string;
  amount: number;
  headers: Record<string, string>;
  body: Record<string, string>;
};

export async function chargeToken(params: ChargeRequestParams): Promise<void> {
  const dateNow = new Date().toISOString().slice(0, 19);

  let data: Record<string, string> = {
    ...params.headers,
    ...params.body,
  };

  data["timestamp"] = dateNow;
  data["passphrase"] = PASSPHRASE;

  //sort variables alphabetically
  const sortedDataArray = Object.entries(data).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  let str1 = "";
  for (const [key, value] of sortedDataArray) {
    str1 = str1 + key + "=" + encodeURIComponent(value) + "&";
  }

  str1 = str1.slice(0, -1).replace(/%20/g, "+");

  const signature = crypto.createHash("md5").update(str1).digest("hex");

  const requestHeaders: Headers = new Headers(params.headers);
  requestHeaders.set("signature", signature);
  requestHeaders.set("timestamp", dateNow);
  requestHeaders.set("Content-Type", "application/x-www-form-urlencoded");

  const requestBody = new URLSearchParams(params.body);

  

    const response = await fetch(`https://api.payfast.co.za/subscriptions/${params.token}/adhoc?testing=true`, {
        method: "POST",
        headers: requestHeaders,
        body: requestBody,
    });

    

    if (response.status !== 200) {
        throw new Error("Failed to charge card.");
    }
}
