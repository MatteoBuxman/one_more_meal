<script lang="ts">
  import type { Meal } from "$lib/Types/meals";

    let { meal_configuration } : {meal_configuration : Meal} = $props();
</script>

<div class="rounded flex gap-4 m-2">
    {#if meal_configuration.image}
        <img src={meal_configuration.image} alt={meal_configuration.name} class="flex-shrink-0 w-20 h-20 object-cover rounded-lg"/>
    {:else}
        <svg class="flex-shrink-0  size-16 rounded-full bg-slate-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" xml:space="preserve"><path fill="#23AF92" d="M104.485 78.139h-57.66c-5.631 0-7.138 1.614-7.494 2.774.591 14.833 8.396 22.069 19.563 25.076h31.514c11.738-3.118 19.992-10.66 20.262-25.47-.694-2.38-6.185-2.38-6.185-2.38zM56.866 107.315c.136.918.657 2.784 2.615 4.615.098.03.193.063.292.092h29.164c.056-.016.11-.035.165-.051 1.993-1.844 2.523-3.73 2.66-4.656H56.866z"/><path fill="#F6A700" d="M77.448 38.566c-2.778-1.198-5.746-.508-6.63 1.541l-8.751 20.282c-4.714.973-8.258 5.145-8.258 10.148 0 2.082.62 4.017 1.677 5.641h17.368a10.305 10.305 0 0 0 1.677-5.641c0-2.389-.817-4.584-2.176-6.337l8.522-19.753c.885-2.049-.65-4.681-3.429-5.881z"/><path fill="#199C80" d="M74.315 78.139h-27.49c-5.631 0-7.138 1.614-7.494 2.774.591 14.833 8.396 22.069 19.563 25.076h15.421v-27.85z"/></svg>
    {/if}
    <div class="flex flex-col">
        <h3 class="font-bold text-sm">{meal_configuration.name} - {meal_configuration.uuid}</h3>
        <p class="text-xs">{meal_configuration.description}</p>
    </div>
</div>