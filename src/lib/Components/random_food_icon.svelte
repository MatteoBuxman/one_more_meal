<script lang="ts">
  import { Drumstick, Beef, Ham, Soup, Salad, CookingPot } from "lucide-svelte";
  import { onMount } from "svelte";

  let randomFoodIcon: number = 1;

  onMount(() => (randomFoodIcon = Math.floor(Math.random() * 6) + 1));
</script>

{#if randomFoodIcon === 1}
  <Drumstick class="size-7 shrink-0" />
{/if}
{#if randomFoodIcon === 2}
  <Beef class="size-7 shrink-0" />
{/if}
{#if randomFoodIcon === 3}
  <Ham class="size-7 shrink-0" />
{/if}
{#if randomFoodIcon === 4}
  <Soup class="size-7 shrink-0" />
{/if}
{#if randomFoodIcon === 5}
  <Salad class="size-7 shrink-0" />
{/if}
{#if randomFoodIcon === 6}
  <CookingPot class="size-7 shrink-0" />
{/if}
