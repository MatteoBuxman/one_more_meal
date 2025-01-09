<script lang="ts">
  import OrderStateBadge from "$lib/Components/Features/Dashboard/order_state_badge.svelte";
</script>


<OrderStateBadge status="ordered" />
<OrderStateBadge status="picked_up" />
<OrderStateBadge status="completed" />
<OrderStateBadge status="cancelled" />


