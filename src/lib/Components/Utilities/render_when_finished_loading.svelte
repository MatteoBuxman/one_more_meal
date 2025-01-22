<script lang="ts">
    import { goto } from "$app/navigation";
    import { useAuthStore } from "$lib/firebase/firebase_init";
    import { LoaderPinwheel } from "lucide-svelte";
    import type { Snippet } from "svelte";
  
    const auth = useAuthStore();
  
    type LoadingRouteProps = {
      redirectPath: string;
      children: Snippet;
    };
  
    let { redirectPath, children }: LoadingRouteProps = $props();
  
    $effect(() => {
      if (!$auth.loading && !$auth.error && $auth.user) {
        goto(redirectPath);
      }
    });
  </script>
  
  {#if $auth.loading}
    <div class="w-full h-[800px] flex justify-center items-center">
      <div class="animate-spin"><LoaderPinwheel size={30} /></div>
    </div>
  {:else if !$auth.user}
    {@render children()}
    {:else if $auth.error}
    <div class="flex justify-center items-center h-screen">
      <p class="text-2xl">An error occurred.</p>
    </div>
  {/if}
  