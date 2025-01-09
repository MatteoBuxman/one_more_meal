<script lang="ts">
  import ModalPopupMobile from "$lib/Components/Features/Utilities/modal_popup_mobile.svelte";
  import { formatDate } from "$lib/Logic/format_date";
  import type { Order } from "$lib/Types/orders";
  import { Clock, ChevronDown, ChevronRight } from "lucide-svelte";
  import OpenDonationFurtherInformation from "./donation_further_information.svelte";
  import LoadingBar from "../Utilities/loading_bar.svelte";
  import { useFirestore } from "$lib/Firebase/firebase_init";
  import { fetchOrderMeals } from "$lib/Firebase/Firestore/fetch_data";
  import type { Meal } from "$lib/Types/meals";
  import { clampString } from "$lib/Logic/clamp_string";
  import { slide } from "svelte/transition";
  import OrderStateBadge from "./order_state_badge.svelte";
  

  type OpenDonationProps = {
    order: Order;
    expandedOrder: string | null;
    toggleOrder: (orderId: string) => void;
  };

  let { order, expandedOrder, toggleOrder }: OpenDonationProps = $props();

  //Order information modal
  let isOpen = $state(false);

  const firestore = useFirestore();

  let meals: Meal[];

  //Fetch the meals in this order when the user clicks on it.
  async function fetchMeals(): Promise<Meal[]> {
    const mealReturn =  fetchOrderMeals(firestore, order.id);
    mealReturn.then((mealsT) => {
      meals = mealsT;
    });
    return mealReturn;
  }

</script>

<div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
  <button
    onclick={() => toggleOrder(order.id)}
    class="w-full text-left p-4 hover:bg-gray-50 transition-colors"
  >
    
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <div class="flex gap-2">
          <Clock size={20} class="text-gray-400" />
          <span class="text-sm text-gray-500"
            >{formatDate(order.created_at)}</span
          >

        </div>
        <div class="flex items-center gap-3">
            <OrderStateBadge status={order.status} />
            {#if expandedOrder === order.id}
          <ChevronDown size={20} class="text-gray-400" />
        {:else}
          <ChevronRight size={20} class="text-gray-400" />
        {/if}

        </div>
        </div>
        <div>
          <h3 class="text-sm font-semibold">Order #{order.id}...</h3>
          <p class="text-sm text-gray-600">{order.orderSize} meals</p>
        </div>
      </div>
    
  </button>

  {#if expandedOrder === order.id}
    <div class="border-t border-gray-200 p-4 bg-gray-50" transition:slide>
      <div class="space-y-4">
        {#await fetchMeals()}
          <LoadingBar />
        {:then meals}
          {#each meals as meal}
            <button
              class="w-full text-left flex items-center justify-between"
              onclick={() => (isOpen = true)}
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center  shrink-0"
                >
                  <span class="text-red-600">🍱</span>
                </div>
                <div>
                  <h4 class="font-medium">{meal.name}</h4>
                  <p class="text-sm text-gray-600">{clampString(meal.description, 80)}</p>
                </div>
              </div>
              <span class="text-sm text-gray-500">x{meal.quantity}</span>
            </button>
          {/each}
          {:catch error}
            <p class="text-sm text-red-600">{error.message}</p>
        {/await}
      </div>
    </div>
  {/if}
</div>

<ModalPopupMobile bind:isOpen destroyChildrenOnClose={true}>
  <OpenDonationFurtherInformation {order} {meals}/>
</ModalPopupMobile>