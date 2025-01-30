<script lang="ts">
  import type { Meal } from "$lib/types/meals";
  import { getContext } from "svelte";
  import ScanAdditionalMeals from "./scan_additional_meals.svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Slider from "$lib/components/ui/slider/slider.svelte";
  import type { CurrentOrderState } from "./current_order_provider/current_order_state.svelte";

  let currentOrder = getContext<CurrentOrderState>("current_order_state");

  let {
    initital_meal_id,
    close,
  }: { initital_meal_id: string; close: () => void } = $props();

  let scan_additional_meals = $state(false);

  let meal_data = $state<Meal>({
    firestoreMealID: "",
    ids: [initital_meal_id],
    name: "",
    description: "",
    quantity: 1,
  });

  function handleAddMeal(event: Event) {
    event.preventDefault();

    if (meal_data.quantity > 1) {
      currentOrder.pushToStagingArea(initital_meal_id);
      scan_additional_meals = true;
      return;
    }

    currentOrder.pushMeal(meal_data);
    close();
  }
</script>

<!-- Form Content -->
<form class="space-y-6" onsubmit={handleAddMeal}>
  <Badge variant="outline">Meal #{initital_meal_id}</Badge>

  <div class="space-y-4">
    <div>
      <Label
        for="mealName"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        Meal Name
      </Label>
      <Input
        id="mealName"
        type="text"
        placeholder="Enter the meal name"
        bind:value={meal_data.name}
        required
      />
    </div>

    <div>
      <Label
        for="description"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        Description (Optional)
      </Label>
      <Textarea
        id="description"
        placeholder="Add a description"
        bind:value={meal_data.description}
      ></Textarea>
    </div>

    <div class="w-full">
      <Label for="amount" class="block text-sm font-medium text-gray-700 mb-1">
        How many {meal_data.name ? meal_data.name + "s" : "meals"} ?
      </Label>
      <div class="p-3 mx-auto">
        <Slider
          type="single"
          bind:value={meal_data.quantity}
          max={6}
          min={1}
          step={1}
        />
        <div class="flex w-full justify-between text-xs mt-4">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
      </div>
      {#if meal_data.quantity > 1}
        <p class="text-xs mt-2 text-gray-500">
          You will be required to scan the QR codes of the additional meals.
        </p>
      {/if}
    </div>
  </div>

  <Button type="submit" class="w-full">
    Add {meal_data.quantity}
    {meal_data.name
      ? meal_data.name
      : meal_data.quantity > 1
        ? "Meals"
        : "Meal"}
  </Button>
</form>

<!-- Popup to handle additional scans if there is more than one of a particular meal -->
<ScanAdditionalMeals
  bind:isOpen={scan_additional_meals}
  meal_data={JSON.parse(JSON.stringify(meal_data))}
  {close}
/>
