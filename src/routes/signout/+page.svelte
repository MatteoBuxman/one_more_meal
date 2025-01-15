<script>
  import * as Card from "$lib/components/ui/card";
  import * as Button from "$lib/components/ui/button";
  import { signOut } from "firebase/auth";
  import { useAuthStore } from "$lib/Firebase/firebase_init";
  import { auth } from "$lib/Firebase/firebase_init";

  let isOpen = false; // State for controlling card visibility

  function confirmSignOut() {
    signOut(auth);
  }
</script>

<Card.Root class="max-w-sm w-[90%] mx-auto mt-10 shadow-lg bg-white rounded-lg">
  <Card.Header>
    <Card.Title>Sign Out</Card.Title>
    <Card.Description>Are you sure you want to sign out?</Card.Description>
  </Card.Header>
  <Card.Content class="mt-4">
    <p class="text-gray-600">
      You will need to log in again to access your account.
    </p>
  </Card.Content>
  <Card.Footer class="flex justify-end gap-4 mt-6">
    <a href="/dashboard">
      <Button.Root class="bg-gray-200 text-gray-700">Cancel</Button.Root>
    </a>
    <Button.Root onclick={confirmSignOut} class="bg-red-500 text-white">
      Sign Out
    </Button.Root>
  </Card.Footer>
</Card.Root>
