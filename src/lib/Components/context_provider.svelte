<script lang="ts">
  import { setContext } from "svelte";

  let { children, contextValues = {} } = $props();

  for (const [key, value] of Object.entries(contextValues)) {
    setContext(key, value);
  }
</script>

{@render children()}
