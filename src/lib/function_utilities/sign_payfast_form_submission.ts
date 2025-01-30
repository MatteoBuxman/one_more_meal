import { PASSPHRASE } from "$env/static/private";
import crypto from "node:crypto";

export function signForm(form_data: FormData): string {
  let pfParamString = "";

  form_data.forEach((value, key) => {
    pfParamString += `${key}=${encodeURIComponent(
      value.toString().trim()
    ).replace(/%20/g, "+")}&`;
  });

  pfParamString = pfParamString.slice(0, -1);

  if (PASSPHRASE !== null) {
    pfParamString += `&passphrase=${encodeURIComponent(
      PASSPHRASE.trim()
    ).replace(/%20/g, "+")}`;
  }

  const signature = crypto
    .createHash("md5")
    .update(pfParamString)
    .digest("hex");

  return signature;
}
