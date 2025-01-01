<script lang="ts">
  import ContextProvider from "$lib/Components/context_provider.svelte";
  import { firebaseContext } from "../hooks.client";
  import "../app.css";
  let { children } = $props();
</script>

<ContextProvider contextValues={firebaseContext}>
  {@render children()}
</ContextProvider>
