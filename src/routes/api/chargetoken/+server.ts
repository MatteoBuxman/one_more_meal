
import { chargeToken } from "$lib/payfast/charge_token.js";
import { error } from "@sveltejs/kit";


type ChargeRequest = {
  token: string; //
  amount: number; //Amount in cents
  reason: string; //Reason for the charge
  userID: string; //User ID
};

const MERCHANT_ID = "10032305";
const version = "v1";
const ITEM_NAME = "Card Charge";

//Charge a user's card
export async function POST({ request }) {
  try {
    const data = (await request.json()) as ChargeRequest;
    const { token, amount, reason, userID } = data;

    const headers = {
      "merchant-id": MERCHANT_ID,
      version,
    };

    const body = {
      amount: amount + "",
      item_name: ITEM_NAME,
      m_payment_id: reason,
      custom_str1: userID,
      custom_str2: reason,
    };

    //Charge the card

    await chargeToken({
      token,
      amount,
      headers,
      body,
    });

    return new Response("Charge Request Recieved.", { status: 200 });
  } catch (e) {
    error(400, (e as Error).message);
  }
}
