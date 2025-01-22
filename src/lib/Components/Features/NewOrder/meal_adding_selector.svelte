<script lang="ts">
  import type { OneMoreMealPackagingFlowState } from "$lib/types/meals";
  import AddedMealCard from "./added_meal_card.svelte";
  import { getContext } from "svelte";

  let flowState = getContext<OneMoreMealPackagingFlowState>(
    "add_meal_flow_state"
  );
</script>

<div class="mt-3 font-lexend flex flex-col gap-3">
  {#each flowState.addedMeals as meal_configuration}
    <AddedMealCard {meal_configuration} />
  {/each}
</div>
