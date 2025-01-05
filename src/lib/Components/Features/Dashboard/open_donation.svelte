<script lang="ts">
  import ModalPopupMobile from "$lib/Components/modal_popup_mobile.svelte";
  import { formatDate } from "$lib/Logic/format_date";
  import type { OpenOrder } from "$lib/Types/orders";
  import { Clock, ChevronDown, ChevronRight } from "lucide-svelte";
  import OpenDonationFurtherInformation from "./open_donation_further_information.svelte";

  type OpenDonationProps = {
    order: OpenOrder;
    expandedOrder: string | null;
    toggleOrder: (orderId: string) => void;
  };

  let { order, expandedOrder, toggleOrder }: OpenDonationProps = $props();

  //Order information modal
  let isOpen = $state(false);
</script>

<div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
  <button
    onclick={() => toggleOrder(order.id)}
    class="w-full text-left p-4 hover:bg-gray-50 transition-colors"
  >
    <div class="flex justify-between items-start">
      <div class="space-y-2">
        <div class="flex items-center space-x-3">
          <Clock size={20} class="text-gray-400" />
          <span class="text-sm text-gray-500"
            >{formatDate(order.created_at)}</span
          >
        </div>
        <div>
          <h3 class="text-sm font-semibold">Order #{order.id}</h3>
          <p class="text-sm text-gray-600">
            {order.meals.reduce((acc, meal) => acc + meal.quantity, 0)} meals
          </p>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <span
          class="px-3 py-1 rounded-full text-sm {order.status === 'picked_up'
            ? 'bg-sky-100 text-sky-700'
            : 'bg-gray-200 text-gray-700'}"
        >
          {order.status === "picked_up" ? "Picked up" : "Ordered"}
        </span>
        {#if expandedOrder === order.id}
          <ChevronDown size={20} class="text-gray-400" />
        {:else}
          <ChevronRight size={20} class="text-gray-400" />
        {/if}
      </div>
    </div>
  </button>

  {#if expandedOrder === order.id}
    <div class="border-t border-gray-200 p-4 bg-gray-50">
      <div class="space-y-4">
        {#each order.meals as meal}
          <button class="w-full text-left flex items-center justify-between" onclick={()=>isOpen = true}>
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"
              >
                <span class="text-red-600">🍱</span>
              </div>
              <div>
                <h4 class="font-medium">{meal.name}</h4>
                <p class="text-sm text-gray-600">{meal.description}</p>
              </div>
            </div>
            <span class="text-sm text-gray-500">x{meal.quantity}</span>
        </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<ModalPopupMobile bind:isOpen>
    <OpenDonationFurtherInformation {order}/>
</ModalPopupMobile>