import { PayfastValidationError } from "$lib/errors/payfast/payfast_errors.js";
import { InternalServerError } from "$lib/errors/server/server_errors.js";
import { firestore } from "$lib/firebase/firebase_init.js";
import { validateITN } from "$lib/payfast/validate_itn.js";
import { error } from "@sveltejs/kit";
import { FirebaseError } from "firebase/app";
import { doc, setDoc, Timestamp } from "firebase/firestore";

enum PayfastStatus {
  COMPLETE = "COMPLETE",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

async function addTokenToUser(data: Record<string, string>) {

  const user_id = data["custom_str1"];
  const card_name = data["custom_str2"];
  
  const token = data["token"];

  const docRef = doc(firestore, "Users", user_id, "added_cards", token);

  await setDoc(docRef, {
    added: Timestamp.now(),
    card_name,
  });
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

    //Check for a CANCELLED ITN
    if (data["status"] === PayfastStatus.FAILED) {
      console.log("ITN with status FAILED recieved.", data);
      return new Response("ITN with status FAILED recieved.", { status: 200 });
    }


    //Function throws if there is an error.
    await validateITN(data, request.headers);

    //Add the card to the user's account
    await addTokenToUser(data);

    return new Response("Valid ITN Recieved.", { status: 200 });
  } catch (e) {
    if (e instanceof PayfastValidationError) {
      console.log("Invalid ITN Recieved: ", e.message);
      return error(500, `Invalid ITN Recieved: ${e.message}`); //PayFast expects a 500 response code should our checks fail.
    } else if (e instanceof InternalServerError) {
      console.log("Internal server error: ", e.message);
      return error(500, e.message);
    } else if (e instanceof FirebaseError) {
      //This case occurs in the rare event that the PayFast operations are successful but we fail to post the new information to the firestore database.
      //PayFast should still recieve a success message as all operations regarding them were successful.
      console.log(
        "Failed to add new card to user account in Firestore, but operation was successful on PayFast's end.",
        e.message
      );

      return new Response("Valid ITN Recieved.", { status: 200 });
    } //Catch all
    else if(e instanceof Error) {
      console.log("An unknown internal server error occurred: ", e.message);
      return error(500, `An unknown internal server error occurred. ${e.message}`);
    }
  }
}
