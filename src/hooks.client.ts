import { createFirebaseContext } from "$lib/Firebase/firebase_init";

export const firebaseContext = {
  //See explanation of 'descend' in $lib/Components/context_provider.svelte
  descend: createFirebaseContext(),
}