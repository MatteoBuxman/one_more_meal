<script lang="ts">
  import { setContext } from "svelte";

  let { children, contextValues = {} } = $props();

  for (const [key, value] of Object.entries(contextValues)) {
    //If the key name was set to descend, we should expect the associated value to be a 2-tuple where the first element is the key, and the second is the value to be set at the key. This is a quick solution to the difficulties Object.entries has with symbol object keys.
    if (key === "descend") {
      const [keyTemp, valueTemp] = value;
      setContext(keyTemp, valueTemp);
      continue;
    }
    setContext(key, value);
  }
</script>

{@render children()}
