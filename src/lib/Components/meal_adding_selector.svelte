<script lang="ts">
    import AddedMealCard from "./added_meal_card.svelte";
    import type { Meal } from "$lib/Types/meals";

    const added_meals: Meal[] = [
        {
            uuid: 'yghffuidjd45',
            name: "Spaghetti Bolognese",
            description: "A classic Italian pasta dish with rich, meaty sauce.",
            image: ""
        },
        {
            uuid: 'ufgb4548dhd4',
            name: "Chicken Caesar Salad",
            description: "Crisp romaine lettuce with grilled chicken, croutons, and Caesar dressing.",
            image: ""
        },
        {
            uuid: 'frrfuhgruf84',
            name: "Vegetable Stir Fry",
            description: "A mix of fresh vegetables stir-fried with a savory sauce.",
            image: ""
        }
    ];
    
</script>


<div class="mt-3 font-lexend">
    <div class="mb-7">
        <h2 class="font-light text-sm"> <span class="font-bold">{added_meals.length}</span> added meals.</h2>
    </div>
    <div class="flex flex-col gap-3">
        {#each added_meals as meal_configuration}
            <AddedMealCard {meal_configuration} />
        {/each}
    </div>
</div>