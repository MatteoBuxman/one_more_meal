import {
  IncorrectDataFormatError,
  MissingRequestDataError,
} from "$lib/errors/server/server_errors";
import { signForm } from "$lib/function_utilities/sign_payfast_form_submission";
import { error, json } from "@sveltejs/kit";

export async function POST({ request }) {
  const requiredFields = [
    "merchant_id", // Your unique PayFast Merchant ID
    "merchant_key", // Your unique PayFast Merchant Key
    "return_url", // URL to redirect after payment process
    "cancel_url", // URL to redirect if payment is canceled
    "notify_url", // URL for PayFast to send ITN callbacks        'email_address',       // Customer's email address
    "amount", // Amount to be charged
    "item_name", // Description of the item or service
    "subscription_type", // Set to '2' for tokenization
    "custom_str1", // The user_id of the user
  ];

  try {
    //Check the request data type is correct
    if (
      !request.headers
        .get("Content-Type")
        ?.includes("application/x-www-form-urlencoded")
    ) {
      throw new IncorrectDataFormatError(
        "Incorrect data format. Expected application/x-www-form-urlencoded"
      );
    }

    const formData = await request.formData();

    //Check required fields are present
    for (const field of requiredFields) {
      if (!formData.has(field)) {
        throw new MissingRequestDataError(`Missing required field: ${field}`);
      }
    }

    const signature = signForm(formData);

    return json(
      {
        signature,
      },
      {
        status: 200,
      }
    );

  } catch (e) {
    if (e instanceof IncorrectDataFormatError || e instanceof MissingRequestDataError) {
      console.log(e.message);
      return json({ error_message: e.message }, { status: 400 });
    } 
    //Catch all
    else if (e instanceof Error) {
      console.log("An unknown internal server error occurred: ", e.message);
      return json({ error_message: "Internal Server Error" }, { status: 500 });
    }
  }
}
