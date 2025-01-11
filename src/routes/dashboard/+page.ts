import { fetchUserCompletedOrders, fetchUserOpenOrders } from "$lib/Firebase/Firestore/fetch_data.js";
import type { PageLoad } from "./$types.js";
import { firestore } from "$lib/Firebase/firebase_init.js";

export const ssr = false;

export const load: PageLoad = async () => {

  return {
    openOrders: fetchUserOpenOrders(firestore, "lXBHaMmIqs5UC11ymLT1xgTdg9lA"),
    completedOrders: fetchUserCompletedOrders(firestore, "lXBHaMmIqs5UC11ymLT1xgTdg9lA"),
  };
}

