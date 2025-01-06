<script lang="ts">
  import { Drumstick, Beef, Ham, Soup, Salad, CookingPot } from "lucide-svelte";
  import { onMount } from "svelte";

  let randomFoodIcon: number = $state(1);

  let { size = 24 } = $props();
 
  onMount(() => (randomFoodIcon = Math.floor(Math.random() * 6) + 1));
</script>

{#if randomFoodIcon === 1}
  <Drumstick {size} class="shrink-0" />
{/if}
{#if randomFoodIcon === 2}
  <Beef {size} class="shrink-0" />
{/if}
{#if randomFoodIcon === 3}
  <Ham {size} class="shrink-0" />
{/if}
{#if randomFoodIcon === 4}
  <Soup {size} class="shrink-0" />
{/if}
{#if randomFoodIcon === 5}
  <Salad {size}  class="shrink-0" />
{/if}
{#if randomFoodIcon === 6}
  <CookingPot {size} class="shrink-0" />
{/if}
