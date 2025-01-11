<script lang="ts">
  import type { Meal } from "$lib/Types/meals";
  import { ChevronRight } from "lucide-svelte";
  import RandomFoodIcon from "../../Utilities/random_food_icon.svelte";
  import EditMealInfo from "./edit_meal_info.svelte";
  import { clampString } from "$lib/Logic/clamp_string";

  let { meal_configuration }: { meal_configuration: Meal } = $props();

  let isOpen = $state<boolean>(false);

  function handleOpen() {
    isOpen = true;
  }

  function handleClose() {
    isOpen = false;
  }

</script>

<button class="card p-4 hover:bg-gray-50 w-full text-left" onclick={handleOpen}>
  <div class="flex items-center justify-between w-full">
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
        </div>
        <p class="text-sm text-gray-600">{meal_configuration.description}</p>
      </div>
    </div>
    <ChevronRight class="text-gray-400 shrink-0" />
  </div>
</button>

<EditMealInfo bind:isOpen {meal_configuration} {handleClose} />

<style>
  .card {
    @apply bg-white rounded-lg shadow-sm border border-gray-200;
  }
</style>
