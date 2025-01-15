<script lang="ts">
  import ContextProvider from "$lib/components/Utilities/context_provider.svelte";
  import { firebaseContext } from "../hooks.client";
  import "../app.css";
  import LoadingBar from "$lib/components/Utilities/loading_bar.svelte";
  import { navigating } from "$app/stores";

  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import Footer from "$lib/components/Static/footer.svelte";

  let { children } = $props();
</script>

<div class="fixed top-0 w-full">
  {#if $navigating}
    <LoadingBar />
  {/if}
</div>
<ContextProvider contextValues={firebaseContext}>
  <Sidebar.Provider>
    <Sidebar.Inset>
      <header
        class=" bg-white top-0 w-full flex h-16 shrink-0 items-center gap-2 border-b px-4"
      >
        <a href="/"
          ><div class="flex gap-3 items-center">
            <img src="/main_logo.png" alt="OneMoreMeal" class="h-6" />
            <h1 class="font-bold text-md font-lexend">OneMoreMeal</h1>
          </div>
        </a>
        <Sidebar.Trigger class="-mr-1 ml-auto rotate-180 " >
          <h1>Menu</h1>
        </Sidebar.Trigger>
      </header>

      {@render children()}
    </Sidebar.Inset>
    <AppSidebar side="right" />
  </Sidebar.Provider>
</ContextProvider>

<Footer />
