<script lang="ts">
  import ModalPopupMobile from "$lib/components/Utilities/modal_popup_mobile.svelte";
  import { formatDate } from "$lib/Logic/format_date";
  import type { Order } from "$lib/Types/orders";
  import {
    Clock,
    ChevronDown,
    ChevronRight,
    OctagonAlert,
  } from "lucide-svelte";
  import DonationFurtherInformation from "./donation_further_information.svelte";
  import LoadingBar from "../../Utilities/loading_bar.svelte";
  import { useFirestore } from "$lib/Firebase/firebase_init";
  import {
    fetchMealRecipientInfo,
    fetchOrderMeals,
  } from "$lib/Firebase/Firestore/fetch_data";
  import type { Meal, MealsWithRecipients } from "$lib/Types/meals";
  import { clampString } from "$lib/Logic/clamp_string";
  import { slide } from "svelte/transition";
  import OrderStateBadge from "./order_state_badge.svelte";
  import ErrorBadge from "$lib/components/Errors/error_badge.svelte";
  import * as Card from "$lib/components/ui/card/index";
  import ViewMealRecipient from "./view_meal_recipient.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Root } from "$lib/components/ui/button";
  import Badge from "$lib/components/ui/badge/badge.svelte";

  type OpenDonationProps = {
    order: Order;
    expandedOrder: string | null;
    toggleOrder: (orderId: string) => void;
  };

  let { order, expandedOrder, toggleOrder }: OpenDonationProps = $props();

  //Order information modal
  let isOpen = $state(false);

  const firestore = useFirestore();

  let meals: Meal[] = $state([]);

  //Fetch the meals in this order when the user clicks on it.
  async function fetchMeals(): Promise<Meal[]> {
    const mealReturn = fetchOrderMeals(firestore, order.id);
    mealReturn.then((mealsT) => {
      meals = mealsT;
    });
    return mealReturn;
  }

  let mealRecipientInfo: MealsWithRecipients[] = [];

  async function fetchRecipientInfo() {
    //Fetch individual meal statuses for all meals in the order
    const returnVal = fetchMealRecipientInfo(firestore, order.id, meals);
    returnVal.then((val) => {
      mealRecipientInfo = val;
    });
    return returnVal;
  }
</script>

<div>
  <Card.Root
    onclick={() => toggleOrder(order.id)}
    class={expandedOrder === order.id ? "rounded-b-none bg-gray-50" : ""}
  >
    <Card.Header>
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <Clock size={20} />
        <!-- Replace this with your Clock icon -->
        <span>{formatDate(order.created_at as number)}</span>
        <OrderStateBadge status={order.status} />
      </div>
    </Card.Header>
    <Card.Content>
      <h3 class="font-medium font-mono">Order #{clampString(order.id, 20)}</h3>
    </Card.Content>
    <Card.Footer>
      <div class="flex justify-between w-full">
        <span class="text-sm text-gray-500">{order.orderSize} meals</span>
        <p class="text-sm text-gray-500">
          {expandedOrder === order.id ? "Close" : "Click to expand"}
        </p>
      </div>
    </Card.Footer>
  </Card.Root>
  {#if expandedOrder === order.id}
    <Card.Root class="rounded-t-none">
      <Card.Content class="rounded-t-none space-y-4">
        {#await fetchMeals()}
          <LoadingBar />
        {:then meals}
          {#each meals as meal}
            <div>
              <button
                class="w-full text-left flex items-center justify-between"
                onclick={() => (isOpen = true)}
              >
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0"
                  >
                    <span class="text-red-600">🍱</span>
                  </div>
                  <div>
                    <h4 class="font-medium">{meal.name}</h4>
                    <p class="text-sm text-gray-600">
                      {clampString(meal.description, 80)}
                    </p>
                  </div>
                </div>
                <span class="text-sm text-gray-500 ml-2">x{meal.quantity}</span>
              </button>
            </div>
          {/each}
        {:catch error}
          <ErrorBadge {error} />
        {/await}
      </Card.Content>
    </Card.Root>
  {/if}
</div>
<!-- <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
  <button
    onclick={() => toggleOrder(order.id)}
    class="w-full text-left p-4 hover:bg-gray-50 transition-colors"
  >
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <div class="flex gap-2">
          <Clock size={20} class="text-gray-400" />
          <span class="text-sm text-gray-500"
            >{formatDate(order.created_at as number)}</span
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
        <h3 class="text-sm font-semibold">Order #{clampString(order.id, 8)}</h3>
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
                  class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0"
                >
                  <span class="text-red-600">🍱</span>
                </div>
                <div>
                  <h4 class="font-medium">{meal.name}</h4>
                  <p class="text-sm text-gray-600">
                    {clampString(meal.description, 80)}
                  </p>
                </div>
              </div>
              <span class="text-sm text-gray-500">x{meal.quantity}</span>
            </button>
          {/each}
        {:catch error}
          <ErrorBadge {error} />
        {/await}
      </div>
    </div>
  {/if}
</div> -->

<ModalPopupMobile bind:isOpen destroyChildrenOnClose={true} title="">
  <!-- Header -->
  {#snippet header()}
    <div class="border-b border-gray-200">
      <div class="flex flex-col gap-4 justify-between items-start mb-2">
        <div class="flex flex-col gap-2">
          <h2 class="font-semibold text-gray-900">
            Order <span class="font-semibold font-mono"
              >#{clampString(order.id, 16)}</span
            >
          </h2>

          <div class="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={18} class="text-gray-500" />
            <span>{formatDate(order.created_at as number)}</span>
          </div>
        </div>

        <OrderStateBadge status={order.status} />
      </div>
      <p class="text-xs text-gray-600 my-3 mb-4">
        Click on a meal ID to see the person who recieved your meal.
      </p>
    </div>
  {/snippet}

  <!-- Content -->
  {#await fetchRecipientInfo()}
    <LoadingBar />
  {:then mealsWithRecipients}
    <div class="" transition:slide>
      <div class="space-y-4">
        {#each mealsWithRecipients as meal (meal.firestoreMealID)}
          <Card.Root>
            <Card.Header>
              <Card.Title class="text-lg">{meal.name}</Card.Title>
              <Card.Description>{meal.description}</Card.Description>
            </Card.Header>
            <Card.Content>
              <ol class="list-decimal grid grid-cols-1 gap-4 p-3">
                {#each meal.recipients as mealRecipient}
                  <ViewMealRecipient
                    {mealRecipient}
                    orderStatus={order.status}
                  />
                {/each}
              </ol>
            </Card.Content>
            <Card.Footer>
              <p><span class="font-bold">{meal.quantity}</span> meals</p>
            </Card.Footer>
          </Card.Root>
        {/each}
      </div>
    </div>
  {:catch error}
    <div class="m-4">
      <ErrorBadge {error} />
    </div>
  {/await}

  <!-- Footer -->
  {#snippet footer()}
    <div class="flex flex-col gap-4 mt-4">
      <div class="text-sm text-gray-600">
        Total Items: {order.orderSize}
      </div>

      {#if order.status === "ordered"}
        <Button class="btn-danger">Cancel Order</Button>
      {:else}
        <Button>I'd like help with this order</Button>
      {/if}
    </div>
  {/snippet}
</ModalPopupMobile>
