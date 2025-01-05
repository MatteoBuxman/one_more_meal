<script lang="ts">
  import type { OpenOrder, ClosedOrder } from "$lib/Types/orders";
  import ClosedDonation from "./closed_donation.svelte";
  import OpenDonation from "./open_donation.svelte";

  type MealManagerProps = {
    orders: Array<OpenOrder> | Array<ClosedOrder>;
    type: "open" | "closed";
  };

  let { orders, type }: MealManagerProps = $props();

  let expandedOrder: string | null = $state(null);

  function toggleOrder(orderId: string) {
    expandedOrder = expandedOrder === orderId ? null : orderId;
  }
</script>

{#if type === "open"}
  <div class="space-y-4">
    {#each orders as order}
      <OpenDonation order={order as OpenOrder} {expandedOrder} {toggleOrder} />
    {/each}
  </div>
{:else}
  <div class="space-y-4">
    {#each orders as order}
      <ClosedDonation order={order as ClosedOrder} {expandedOrder} {toggleOrder} />
    {/each}
  </div>
{/if}
