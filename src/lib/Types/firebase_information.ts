import type { User } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { Readable } from "svelte/store";

// export type OneMoreMealUserInfo ={
//   name: string;
//   surname: string;
//   phoneNumber: string;
//   address: {
//     city: string;
//     postalCode: string;
//     province: string;
//     street: string;
//     streetNumber: string;
//     suburb: string;
//   }
// }

export interface FirebaseAuthObject{
    user: User | null;
    loading: boolean;
    error: Error | null;
}

export interface FirebaseContext {
  firestore: Firestore;
  authStore: Readable<FirebaseAuthObject>;
}