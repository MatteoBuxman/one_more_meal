import { firestore } from "$lib/Firebase/firebase_init";
import { validateITN } from "$lib/payfast/validate_itn";
import { error } from "@sveltejs/kit";
import { addDoc, Timestamp } from "firebase/firestore";
import { collection } from "firebase/firestore";

async function addPaymentToFirestore(data: Record<string, string>) {
  try {

    const userID = data.custom_str1;
    const token = data.token;

    const amount = {
        amount_gross: data.amount_gross,
        amount_net: data.amount_net,
    }

    const collectionRef = collection(
      firestore,
      "Users",
      userID,
      "added_cards",
      token,
      "charges"
    );

    await addDoc(collectionRef, {
      amount,
      item_name: data.item_name,
      timestamp: Timestamp.now(),
    });
  } catch (e) {
    console.log(e);
  }
}

//Endpoint to register a user add card action
export async function POST({ request }) {
  const itn = await request.formData();

  let data: Record<string, string> = {};

  for (const value of itn.entries()) {
    const [key, val] = value;

    data[key as string] = val as string;
  }

  try {
    //Function throws if there is an error.
    await validateITN(data, request.headers);

    addPaymentToFirestore(data);

    return new Response("Valid ITN Recieved.", { status: 200 });
  } catch (e) {
    error(401, (e as Error).message);
  }
}
