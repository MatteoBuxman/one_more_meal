<script lang="ts">
  import { Button } from "$lib/components/ui/button/index";
  import * as Card from "$lib/components/ui/card/index";
  import { Input } from "$lib/components/ui/input/index";
  import { Label } from "$lib/components/ui/label/index";
  import { auth } from "$lib/firebase/firebase_init";
  import { validateUserSignIn } from "$lib/utilities/form_validation";
  import { FirebaseError } from "firebase/app";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { LoaderPinwheel } from "lucide-svelte";

  let email = $state("");
  let password = $state("");
  let error = $state("");
  let loading = $state(false);

  async function signIn(e: Event) {
    loading = true;
    e.preventDefault();
    error = "";

    const validation = validateUserSignIn(email, password);

    if (validation.success) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        if (e instanceof FirebaseError) {
          switch (e.code) {
            case "auth/user-not-found":
              error =
                "We could not find your account. Please click the sign up button above.";
              break;
            case "auth/wrong-password":
              error = "Your password is incorrect.";
              break;
            default:
              error = e.message;
              break;
          }
        }
      }
    } else {
      error = validation.error?.errors[0].message || "";
    }
    loading = false;
  }
</script>

<Card.Root class="mx-auto max-w-sm w-full mt-8">
  <Card.Header>
    <Card.Title class="text-2xl">Sign In</Card.Title>
    <Card.Description
      >Enter your email below to login to your account</Card.Description
    >
  </Card.Header>
  <Card.Content>
    <form class="grid gap-4">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          bind:value={email}
        />
      </div>
      <div class="grid gap-2">
        <div class="flex items-center">
          <Label for="password">Password</Label>
          <a href="##" class="ml-auto inline-block text-sm underline">
            Forgot your password?
          </a>
        </div>
        <Input id="password" type="password" required bind:value={password} />
      </div>
      <Button type="submit" onclick={signIn} class="w-full">
        {#if !loading}
          <h3>Login</h3>
        {:else}
          <div class="flex justify-center items-center">
            <div
              class="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"
            >
              <LoaderPinwheel />
            </div>
          </div>
        {/if}
      </Button>
      <Button variant="outline" class="w-full">Continue with Google</Button>
    </form>
    <div class="mt-4 text-center text-sm">
      Don't have an account?
      <a href="/signup" class="underline"> Sign up </a>
    </div>

    {#if error}
      <div class="mt-4 text-center text-red-700 text-sm">
        {error}
      </div>
    {/if}
  </Card.Content>
</Card.Root>
