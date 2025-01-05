<script lang="ts">
  import { formatDate } from "$lib/Logic/format_date";
  import type { ClosedOrder } from "$lib/Types/orders";
    import { Clock, ChevronDown, ChevronRight } from "lucide-svelte";

    type ClosedDonationProps = {
      order: ClosedOrder;
      expandedOrder: string | null;
      toggleOrder: (orderId: string) => void;
    };
  
    let { order, expandedOrder, toggleOrder } : ClosedDonationProps = $props();
  
    function getStatusStyle(status: string): string {
      switch (status) {
        case "completed":
          return "bg-blue-100 text-blue-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    }
  
    function getStatusText(status: string): string {
      switch (status) {
        case "completed":
          return "Completed";
        default:
          return status;
      }
    }
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
            <span class="text-sm text-gray-500">{formatDate(order.created_at)}</span>
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
            class="px-3 py-1 rounded-full text-sm {order.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}"
          >
            {order.status === "completed" ? "Completed" : "Cancelled"}
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
            <div class="flex items-center justify-between">
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
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
  