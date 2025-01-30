<script lang="ts">
  import { goto } from "$app/navigation";
  import type { CurrentOrderState } from "$lib/components/Features/NewOrder/current_order_provider/current_order_state.svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import CardContent from "$lib/components/ui/card/card-content.svelte";
  import Card from "$lib/components/ui/card/card.svelte";
  import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
  import { clampString } from "$lib/function_utilities/clamp_string";
  import { formatDate } from "$lib/function_utilities/format_date";
  import { Check } from "lucide-svelte";
  import { getContext, onMount } from "svelte";

  const order_state = getContext<CurrentOrderState>("current_order_state");

    onMount(()=>{
      if(!order_state.order.is_complete){
        goto(`/newmeal/${order_state.order.id}`);
      }
    })

</script>


<div class="min-h-screen bg-gray-50 flex  justify-center p-3">
  <Card class="max-w-md w-full">
    <CardContent class="pt-6 text-center">
      <div class="mb-4 flex justify-center">
        <div
          class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center"
        >
          <Check class="h-6 w-6 text-green-600" />
        </div>
      </div>

      <h1 class="text-2xl font-semibold text-gray-900 mb-2">
        Pickup Request Confirmed!
      </h1>

      <p class="text-gray-500 mb-6 text-sm">
        Thank you for your pickup request. You will recieve a message when your meals are about to be picked up!
      </p>

      <div class="space-y-4">
        <div class="border-t border-gray-200 p-4 space-y-4">
          <div class="flex flex-col gap-2 items-start text-sm">
            <span class="text-gray-500">Order Number</span>
            <Badge variant="outline">#{clampString(order_state.order.id, 160)}</Badge>
          </div>
          <div class="flex flex-col items-start text-sm mt-2">
            <span class="text-gray-500">Date</span>
            <span class="font-medium text-gray-900">{formatDate(order_state.order.placed_at ?? 0)}</span>
          </div>
        </div>

        <div class="border-t border-b border-gray-200 py-4">
          <h2 class="text-lg font-medium text-gray-900 mb-4 text-left">
            Meals to Pick Up
          </h2>
          <ScrollArea class="h-48">
            <div class="space-y-3">
              {#each order_state.order.meals as meal, index (index)}
                <div class="flex text-sm">
                  <div class="flex-1 text-left">
                    <span class="font-medium text-gray-900">
                      {meal.quantity}x {meal.name}
                    </span>
                  </div>
                </div>
              {/each}
            </div>
          </ScrollArea>

          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex justify-between text-sm">
              <span>Pickup fee</span>
              <span class="font-medium">R{50}</span>
            </div>
          </div>
        </div>
        <a href="/dashboard">
          <Button class="w-full">Return to Dashboard</Button>
        </a>
      </div>
    </CardContent>
  </Card>
</div>