import { getContext } from "svelte";
import { get, readable } from "svelte/store";
import {
  getAuth,
  onAuthStateChanged,
  connectAuthEmulator,
  type User,
} from "firebase/auth";
import type {
  FirebaseAuthObject,
  FirebaseContext,
} from "$lib/types/firebase_information";
import {
  getFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { getApps, initializeApp } from "firebase/app";

//Production or Development mode
import { PUBLIC_PRODUCTION } from "$lib/function_utilities/production_state";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
  apiKey: "AIzaSyBqumOFXVc47UbTgEWPK6q1-DJCf5VIWjI",
  authDomain: "onemoremeal-7b0a9.firebaseapp.com",
  projectId: "onemoremeal-7b0a9",
  storageBucket: "onemoremeal-7b0a9.firebasestorage.app",
  messagingSenderId: "25877076900",
  appId: "1:25877076900:web:cbf84a619e89b22e7e7f31",
  measurementId: "G-FSJ00GGB66",
};

// Initialize Firebase
// Check if any Firebase apps exist
const apps = getApps();
// Initialize only if no apps exist
const app = !apps.length ? initializeApp(firebaseConfig) : apps[0];

export const auth = getAuth(app);
export const firestore = getFirestore(app);

if (!PUBLIC_PRODUCTION) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(firestore, "localhost", 8080);
}

// Key for the Firebase context
const FIREBASE_KEY = Symbol("firebase");

// Create a readable store for auth state
const createAuthStore = () => {
  return readable<FirebaseAuthObject>(
    {
      user: null,
      loading: true,
      error: null,
    },
    (set) => {
      // Set up auth state listener
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {

            

            set({
              user,
              loading: false,
              error: null,
            });
          } catch (e) {
            set({
              user,
              loading: false,
              error: e as Error,
            });
            console.error('Error signing you in: ', e);
          }
        } else {
          set({
            user: null,
            loading: false,
            error: null,
          });
        }
      });

      // Return the unsubscribe function
      return unsubscribe;
    }
  );
};



export function createFirebaseContext(): [symbol, FirebaseContext] {
  // Create the auth store
  const authStore = createAuthStore();
  

  // Create the context value
  const firebaseContext: [symbol, FirebaseContext] = [
    FIREBASE_KEY,
    {
      firestore,
      authStore,
    },
  ];

  return firebaseContext;
}

export function useFirebaseContext() {
  return getContext<FirebaseContext | null>(FIREBASE_KEY);
}

export function useFirestore() {
  const context = useFirebaseContext();
  if (!context) {
    throw new Error("Firebase context is not available");
  }
  return context.firestore;
}

export function useAuthStore() {
  const context = useFirebaseContext();
  if (!context) {
    throw new Error("Firebase context is not available");
  }
  return context.authStore;
}

export function initSignInMethods() {}
