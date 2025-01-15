<script lang="ts">
  import ProtectedRoute from "$lib/components/Utilities/protected_route.svelte";

  

  let { children } = $props();
</script>

<ProtectedRoute>
    {@render children()}
</ProtectedRoute>