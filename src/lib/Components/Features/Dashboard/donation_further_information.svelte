<script lang="ts">
  import { fetchMealRecipientInfo } from "$lib/Firebase/Firestore/fetch_data";
  import { formatDate } from "$lib/Logic/format_date";
  import type { Order } from "$lib/Types/orders";
  import ViewMealRecipient from "./view_meal_recipient.svelte";
  import LoadingBar from "../../Utilities/loading_bar.svelte";
  import { slide } from "svelte/transition";
  import { useFirestore } from "$lib/Firebase/firebase_init";
  import type { Meal, MealsWithRecipients } from "$lib/Types/meals";
  import OrderStateBadge from "./order_state_badge.svelte";
  import { Clock } from "lucide-svelte";
  import ErrorBadge from "$lib/components/Errors/error_badge.svelte";

  let { order, meals }: { order: Order; meals: Meal[] } = $props();

  let firestore = useFirestore();

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


<!-- Content -->
{#await fetchRecipientInfo()}
  <LoadingBar />
{:then mealsWithRecipients}
  <div class="p-4" transition:slide>
    <div class="space-y-4">
      {#each mealsWithRecipients as meal (meal.firestoreMealID)}
        <div class="flex flex-col bg-gray-50 rounded-lg p-4">
          <div class="flex justify-between items-start mb-2">
            <div class="flex flex-col gap-2">
              <h3 class="font-medium text-gray-900">
                {meal.name}
              </h3>
              <div class="grid grid-cols-2 gap-3">
                {#each meal.recipients as mealRecipient}
                  <ViewMealRecipient
                    {mealRecipient}
                    orderStatus={order.status}
                  />
                {/each}
              </div>

              {#if meal.description}
                <p class="text-sm text-gray-600 mt-1">
                  {meal.description}
                </p>
              {/if}
            </div>
            <span
              class="shrink-0 ml-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-700 font-medium border border-gray-200"
            >
              {meal.quantity}
            </span>
          </div>
        </div>
      {/each}
    </div>
  </div>
{:catch error}
<div class="m-4">
  <ErrorBadge {error} />
</div>
{/await}

<!-- Footer -->
<div class="p-4 border-t border-gray-200">
  <div class="flex justify-between items-center">
    <div class="text-sm text-gray-600">
      Total Items: {order.orderSize}
    </div>
  </div>
</div>

<div class="flex flex-col items-center mt-3 gap-3">
  {#if order.status === "ordered"}
    <button class="btn w-[90%] btn-error">Cancel order.</button>
  {:else}
    <button class="btn w-[90%]">I'd like help with this order.</button>
  {/if}
</div>
