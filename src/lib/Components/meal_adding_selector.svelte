<script lang="ts">
    import AddedMealCard from "./added_meal_card.svelte";
    import type { Meal } from "$lib/Types/meals";

    let { addedMeals }: { addedMeals: Meal[] } = $props();
    
</script>


<div class="mt-3 font-lexend">
    <div class="mb-7">
        <h2 class="font-light text-sm"> <span class="font-bold">{addedMeals.length}</span> added meals.</h2>
    </div>
    <div class="flex flex-col gap-3">
        {#each addedMeals as meal_configuration}
            <AddedMealCard {meal_configuration} />
        {/each}
    </div>
</div>