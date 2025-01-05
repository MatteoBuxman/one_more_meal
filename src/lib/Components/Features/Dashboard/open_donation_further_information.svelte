<script lang="ts">
  import { formatDate } from "$lib/Logic/format_date";
  import type { OpenOrder } from "$lib/Types/orders";
  import { ArrowLeft, ArrowRight } from "lucide-svelte";

  let {order}: {order: OpenOrder} = $props();
</script>

<div
  class="bg-white mx-2  overflow-hidden"
>
  <div class="p-4">
    <!-- Header -->
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">
          Order #{order.id}
        </h3>
        <div class="flex items-center gap-2 mt-1 text-sm text-gray-500">
          <!-- Using a simple clock icon SVG since Lucide isn't imported -->
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
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{formatDate(order.created_at)}</span>
        </div>
      </div>
      <span
        class={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "picked_up" ? "bg-sky-100 text-sky-700" : "bg-gray-200 text-gray-700"}`}
      >
        {order.status === "picked_up" ? "Picked Up" : "Ordered"}
      </span>
    </div>
    {#if order.description}
      <p class="text-sm text-gray-500">{order.description}</p>
    {/if}
  </div>
</div>

<div class="divider"></div>

<div class="flex gap-0 mt-2 p-2">
  <button class="btn p-1 rounded-none bg-white"><ArrowLeft size={24} /></button>
  <div class="carousel carousel-center w-full">
    {#each order.meals as meal}
      <div class="carousel-item w-full bg-red-400 rounded-none">
        <h1>{meal.name}</h1>
      </div>
    {/each}
  </div>
  <button class="btn p-1 bg-white rounded-none"><ArrowRight size={24} /></button>
</div>
