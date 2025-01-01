import type { User } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { Readable } from "svelte/store";

export interface FirebaseAuthObject{
    user: User | null;
    loading: boolean;
    error: Error | null;
}

export interface FirebaseContext {
  firestore: Firestore;
  authStore: Readable<FirebaseAuthObject>;
}