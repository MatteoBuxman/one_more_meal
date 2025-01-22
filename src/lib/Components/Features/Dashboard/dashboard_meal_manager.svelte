<script lang="ts">
  import type { Order } from "$lib/types/orders";
  import Donation from "./donation.svelte";

  type MealManagerProps = {
    orders: Array<Order>;
  };

  let { orders }: MealManagerProps = $props();

  let expandedOrder: string | null = $state(null);

  function toggleOrder(orderId: string) {
    expandedOrder = expandedOrder === orderId ? null : orderId;
  }
</script>


  <div class="space-y-4">
    {#each orders as order}
      <Donation {order} {expandedOrder} {toggleOrder} />
    {/each}
  </div>

