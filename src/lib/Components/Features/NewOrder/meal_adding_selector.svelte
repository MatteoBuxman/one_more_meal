<script lang="ts">
  import AddedMealCard from "./added_meal_card.svelte";
  import { getContext } from "svelte";
  import type { CurrentOrderState } from "./current_order_provider/current_order_state.svelte";

  let currentOrder = getContext<CurrentOrderState>(
    "current_order"
  );
</script>

<div class="mt-3 font-lexend flex flex-col gap-3">
  {#each currentOrder.order.meals as meal_configuration}
    <AddedMealCard {meal_configuration} />
  {/each}
</div>
