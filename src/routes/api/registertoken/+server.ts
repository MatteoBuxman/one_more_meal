import { firestore } from "$lib/Firebase/firebase_init.js";
import { validateITN } from "$lib/payfast/validate_itn.js";
import { error } from "@sveltejs/kit";
import { doc, setDoc, Timestamp } from "firebase/firestore";

async function addTokenToUser(data: Record<string, string>) {
  const userId = data["custom_str1"];

  try {
    const docRef = doc(firestore, "Users", userId, "added_cards", data["token"]);

    await setDoc(docRef, {
      added: Timestamp.now(),
      cardName: data["custom_str2"],
    });

    console.log("Token registered.");

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

    //Add the card to the user's account
    addTokenToUser(data);

    return new Response("Valid ITN Recieved.", { status: 200 });
  } catch (e) {
    error(401, (e as Error).message);
  }
}
