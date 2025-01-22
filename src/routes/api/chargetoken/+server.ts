import { PayfastRequestError } from "$lib/errors/payfast/payfast_errors.js";
import {
  IncorrectDataFormatError,
  MissingRequestDataError,
} from "$lib/errors/payfast/server_errors.js";
import { firestore } from "$lib/firebase/firebase_init.js";
import { chargeToken } from "$lib/payfast/charge_token.js";
import { error } from "@sveltejs/kit";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, Timestamp } from "firebase/firestore";

type ChargeRequest = {
  token: string; //
  amount: number; //Amount in cents
  item_name: string; //Reason for the charge
  user_id: string; //User ID
  order_id: string; //Order ID
};

const MERCHANT_ID = "10032305";
const version = "v1";

//Charge a user's card
export async function POST({ request }) {
  try {
    //Check request contains json data
    if (!request.headers.get("content-type")?.includes("application/json")) {
      throw new IncorrectDataFormatError(
        "Request body must be in JSON format."
      );
    }

    const data = await request.json();

    //Check all required fields are present
    const requiredFields = ["token", "amount", "item_name", "user_id", "order_id"];

    for (const field of requiredFields) {
      if (!(field in data)) {
        throw new MissingRequestDataError(
          `Missing required field: ${field}. Required fields are: ${requiredFields.join(
            ", "
          )}`
        );
      }
    }

    //const data = (await request.json()) as ChargeRequest;
    const { token, amount, item_name, user_id, order_id } = data;

    const payfastRequestHeaders = {
      "merchant-id": MERCHANT_ID,
      version,
    };

    const payfastRequestBody = {
      amount: amount + "",
      item_name: item_name,
      m_payment_id: order_id,
      itn: "false", //We don't want to send an ITN as we are already on the server and will see whether the call to the PayFast API is successful.
    };

    //Charge the card

    await chargeToken({
      token,
      amount,
      headers: payfastRequestHeaders,
      body: payfastRequestBody,
    });

    //Add transaction to firestore
    const collectionRef = collection(firestore, "Users", user_id, "added_cards", token, "charges");
    await addDoc(collectionRef, {
      amount,
      item_name,
      order_id,
      timestamp: Timestamp.now(),
    });

    return new Response("Charge request completed successfully.", { status: 200 });
  } catch (e) {
    if (
      e instanceof IncorrectDataFormatError ||
      e instanceof MissingRequestDataError
    ) {
      console.log(e.message);
      return new Response(e.message, { status: 400 });
    }else if(e instanceof PayfastRequestError){
      console.log(`${e.message}. Status code: ${e.status_code}`);
      return new Response(e.message, { status: e.status_code });
    } 
    //This occurs in the rare case that the card is charged successfully but the transaction is not added to the database.
    else if (e instanceof FirebaseError) {
      const data = await request.json() as ChargeRequest;
      console.log(`Transaction on #${data.token} for ${data.amount} (${data.item_name}) @UserID: ${data.user_id} was completed succesfully, but there was an error posting the transaction to firestore.  ${e.message}`);

      //Indicate to the client that the card has actually been charged. This is an issue we have to deal with.
      return new Response("Charge request completed successfully.", { status: 200 });
    }
    else {
      console.log(`An unknown error occured: ${(e as Error).message}`);
      return error(500, (e as Error).message);
    }
  }
}
