<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import CardContent from "$lib/components/ui/card/card-content.svelte";
  import Card from "$lib/components/ui/card/card.svelte";
  import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
  import { Check } from "lucide-svelte";

  // Sample order data - in a real app this would come from props or stores
  const order = {
    orderNumber: "34789",
    date: "January 18, 2025",
    pickupFee: 5.99,
    meals: [
      { name: "Grilled Chicken Salad", quantity: 2 },
      { name: "Margherita Pizza", quantity: 1 },
      { name: "Vegetable Stir Fry", quantity: 1 },
      { name: "Fresh Fruit Smoothie", quantity: 2 },
    ],
  };
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
        <div class="border-t border-gray-200 py-4">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Request number</span>
            <span class="font-medium text-gray-900">#{order.orderNumber}</span>
          </div>
          <div class="flex justify-between text-sm mt-2">
            <span class="text-gray-500">Date</span>
            <span class="font-medium text-gray-900">{order.date}</span>
          </div>
        </div>

        <div class="border-t border-b border-gray-200 py-4">
          <h2 class="text-lg font-medium text-gray-900 mb-4 text-left">
            Meals to Pick Up
          </h2>
          <ScrollArea class="h-48">
            <div class="space-y-3">
              {#each order.meals as meal, index (index)}
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
              <span class="font-medium">${order.pickupFee.toFixed(2)}</span>
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
