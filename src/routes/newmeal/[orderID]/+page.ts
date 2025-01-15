import type { PageLoad } from "./$types";
import {  firestore } from "$lib/Firebase/firebase_init";
import { fetchUserAddresses } from "$lib/Firebase/Firestore/fetch_data";


export const load: PageLoad = () => {
  return {
    userAddresses: fetchUserAddresses(firestore, "lXBHaMmIqs5UC11ymLT1xgTdg9lA"),
  };
};
