<script lang="ts">
  import type { Meal } from "$lib/Types/meals";
  import { ChevronRight } from "lucide-svelte";
  import RandomFoodIcon from "./random_food_icon.svelte";

  let { meal_configuration }: { meal_configuration: Meal } = $props();
</script>

<div class="card p-4 hover:bg-gray-50">
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div
        class="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0"
      >
        <RandomFoodIcon />
      </div>
      <div>
        <div class="flex items-center space-x-2">
          <h3 class=" text-gray-900 text-sm font-bold">
            {meal_configuration.name}
          </h3>
          <span class="text-xs text-gray-400">{meal_configuration.uuid}</span>
        </div>
        <p class="text-sm text-gray-600">{meal_configuration.description}</p>
      </div>
    </div>
    <ChevronRight class="text-gray-400 shrink-0" />
  </div>
</div>

<style>
  .card {
    @apply bg-white rounded-lg shadow-sm border border-gray-200;
  }
</style>
