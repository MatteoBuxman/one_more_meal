<script lang="ts">
  import ContextProvider from "$lib/components/Utilities/context_provider.svelte";
  import type { Snippet } from "svelte";
  import { CurrentOrderState } from "./current_order_state.svelte";

  let { children }: { children: Snippet } = $props();

  const current_order_state = new CurrentOrderState();

  const context = {
    current_order_state,
  };
</script>

<ContextProvider contextValues={context}>
  {@render children()}
</ContextProvider>
