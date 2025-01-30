<script lang="ts">
  import CurrentOrderProvider from "$lib/components/Features/NewOrder/current_order_provider/current_order_provider.svelte";
import ProtectedRoute from "$lib/components/Utilities/protected_route.svelte";

    let {children} = $props();
</script>

<ProtectedRoute>
  <CurrentOrderProvider>
    {@render children()}
  </CurrentOrderProvider>
</ProtectedRoute>