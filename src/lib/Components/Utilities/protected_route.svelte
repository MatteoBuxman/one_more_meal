<script lang="ts">
  import { goto } from "$app/navigation";
  import { useAuthStore } from "$lib/Firebase/firebase_init";
  import { LoaderPinwheel } from "lucide-svelte";
  import type { Snippet } from "svelte";

  const auth = useAuthStore();

  type ProtectedRouteProps = {
    children: Snippet;
  };

  let { children }: ProtectedRouteProps = $props();

  $effect(() => {
    if (!$auth.loading && !$auth.error && !$auth.user) {
      goto("/signin");
    }
  });
</script>

{#if $auth.loading}
  <div class="w-full h-[800px] flex justify-center items-center">
    <div class="animate-spin"><LoaderPinwheel size={30} /></div>
  </div>
{:else if $auth.user}
  {@render children()}
{:else if !$auth.error && !$auth.user}
  <div class="flex justify-center items-center h-screen">
    <p class="text-2xl">Going to sign in.</p>
  </div>
{:else if $auth.error}
  <div class="flex justify-center items-center h-screen">
    <p class="text-2xl">You are not authorised to view this page.</p>
  </div>
{/if}
