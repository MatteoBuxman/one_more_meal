<script lang="ts">
  import type { Meal, OneMoreMealPackagingFlowState } from "$lib/types/meals";
  import { getContext } from "svelte";
  import ScanAdditionalMeals from "./scan_additional_meals.svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Slider from "$lib/components/ui/slider/slider.svelte";

  let flowState = getContext<OneMoreMealPackagingFlowState>(
    "add_meal_flow_state"
  );

  let { ids }: { ids: Array<string> } = $props();

  let scanAdditionalMeals = $state(false);

  let mealData = $state<Meal>({
    firestoreMealID: "eiiebibf8383h",
    ids,
    name: "",
    description: "",
    quantity: 1,
  });

  function handleAddMeal(event: Event) {
    event.preventDefault();

    if (mealData.quantity > 1) {
      scanAdditionalMeals = true;
      return;
    }

    flowState.addedMeals.push(mealData);
    flowState.stateIndex = 0;
  }

  //Handle completion of additional scans
  function onComplete(IDs: Array<string>) {
    mealData.ids.push(...IDs);
    flowState.addedMeals.push(mealData);
    flowState.stateIndex = 0;
  }
</script>

<!-- Form Content -->
<form class="space-y-6" onsubmit={handleAddMeal}>
  <Badge variant="outline">Meal #{ids[0]}</Badge>

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
        bind:value={mealData.name}
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
        bind:value={mealData.description}
      ></Textarea>
    </div>

    <div class="w-full">
      <Label for="amount" class="block text-sm font-medium text-gray-700 mb-1">
        How many {mealData.name  ? mealData.name + 's' : "meals"} ?
      </Label>
      <div class="p-3 mx-auto">
        <Slider type="single" bind:value={mealData.quantity} max={6} min={1} step={1}  />
        <div class="flex w-full justify-between text-xs mt-4">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
      </div>
      {#if mealData.quantity > 1}
        <p class="text-xs mt-2 text-gray-500">
          You will be required to scan the QR codes of the additional meals.
        </p>
      {/if}
    </div>
  </div>

  <Button
    type="submit"
    class="w-full"
  >
    Add {mealData.quantity} {mealData.name ? mealData.name : mealData.quantity > 1 ? "Meals" : "Meal"}
</Button>
</form>

<!-- Popup to handle additional scans if there is more than one of a particular meal -->
<ScanAdditionalMeals bind:isOpen={scanAdditionalMeals} {onComplete} quantity={mealData.quantity} firstID={mealData.ids[0]}/>
