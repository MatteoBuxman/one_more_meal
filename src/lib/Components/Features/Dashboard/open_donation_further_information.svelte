<script lang="ts">
  import { formatDate } from "$lib/Logic/format_date";
  import type { OpenOrder } from "$lib/Types/orders";
  import { onMount } from "svelte";
  import ViewMealRecipient from "./view_meal_recipient.svelte";
  import LoadingBar from "../Utilities/loading_bar.svelte";
  import { slide } from "svelte/transition";

  let { order }: { order: OpenOrder } = $props();
  let totalItems = $state(
    order.meals.reduce((sum, meal) => sum + meal.quantity, 0)
  );

  let isLoadingMealStatus = $state(true);

  const getStatusClasses = (status: "ordered" | "picked_up"): string => {
    return status === "picked_up"
      ? "bg-sky-100 text-sky-700"
      : "bg-gray-100 text-gray-700";
  };

  onMount(() => {
    setTimeout(() => {
      isLoadingMealStatus = false;
    }, 2500);
  });
</script>

<!-- Header -->
<div class="p-4 border-b border-gray-200">
  <div class="flex justify-between items-start mb-2">
    <div>
      <h2 class="text-lg font-semibold text-gray-900">
        Order #{order.id}
      </h2>
      <div class="flex items-center gap-2 mt-1 text-sm text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-4 h-4"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span>{formatDate(order.created_at)}</span>
      </div>
    </div>
    <span
      class={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(order.status)}`}
    >
      {order.status === "picked_up" ? "Picked Up" : "Ordered"}
    </span>
  </div>
  {#if order.description}
    <p class="text-sm text-gray-600">{order.description}</p>
  {/if}
  <p class="text-xs text-gray-600">
    Click on a meal ID to see the person who enjoyed your meal.
  </p>
</div>

<!-- Content -->
{#if !isLoadingMealStatus}
  <div class="p-4" transition:slide>
    <div class="space-y-4">
      {#each order.meals as meal (meal.uuid)}
        <div class="flex flex-col bg-gray-50 rounded-lg p-4">
          <div class="flex justify-between items-start mb-2">
            <div class="flex flex-col gap-2">
              <h3 class="font-medium text-gray-900">
                {meal.name}
              </h3>
              <div class="grid grid-cols-2 gap-3">
                {#each meal.uuid as uuid}
                  <ViewMealRecipient {uuid} />
                {/each}
              </div>

              {#if meal.description}
                <p class="text-sm text-gray-600 mt-1">
                  {meal.description}
                </p>
              {/if}
            </div>
            <span
              class="ml-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-700 font-medium border border-gray-200"
            >
              {meal.quantity}
            </span>
          </div>
        </div>
      {/each}
    </div>
  </div>
{:else}
    <LoadingBar />
{/if}

<!-- Footer -->
<div class="p-4 border-t border-gray-200">
  <div class="flex justify-between items-center">
    <div class="text-sm text-gray-600">
      Total Items: {totalItems}
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
