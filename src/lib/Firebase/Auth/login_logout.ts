import { auth } from "../firebase_init";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}
