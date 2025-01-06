<script lang="ts">
  import type { Meal, OneMoreMealPackagingFlowState } from "$lib/Types/meals";
  import { getContext } from "svelte";
  import ScanAdditionalMeals from "./scan_additional_meals.svelte";

  let flowState = getContext<OneMoreMealPackagingFlowState>(
    "add_meal_flow_state"
  );

  let { uuid }: { uuid: Array<string> } = $props();

  let scanAdditionalMeals = $state(false);

  let mealData = $state<Meal>({
    uuid,
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
    mealData.uuid.push(...IDs);
    flowState.addedMeals.push(mealData);
    flowState.stateIndex = 0;
  }
</script>

<!-- Form Content -->
<form class="space-y-6 px-5" onsubmit={handleAddMeal}>
  <div
    class="inline-flex mt-3 px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700"
  >
    Meal ID: {uuid}
  </div>

  <div class="space-y-4">
    <div>
      <label
        for="mealName"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        Meal Name
      </label>
      <input
        id="mealName"
        type="text"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter the meal name"
        bind:value={mealData.name}
        required
      />
    </div>

    <div>
      <label
        for="description"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        Description (Optional)
      </label>
      <textarea
        id="description"
        class="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px] resize-none"
        placeholder="Add a description"
        bind:value={mealData.description}
      ></textarea>
    </div>

    <div>
      <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">
        Amount of Meals
      </label>
      <input
        id="amount"
        type="number"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        min="1"
        bind:value={mealData.quantity}
        required
      />
      {#if mealData.quantity > 1}
        <p class="text-xs mt-2 text-gray-500">
          You will be required to scan the QR codes of the additional meals.
        </p>
      {/if}
    </div>
  </div>

  <button
    type="submit"
    class="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    Add {mealData.quantity > 1 ? "Meals" : "Meal"}
  </button>
</form>

<!-- Popup to handle additional scans if there is more than one of a particular meal -->
<ScanAdditionalMeals bind:isOpen={scanAdditionalMeals} {onComplete} quantity={mealData.quantity} firstID={mealData.uuid[0]}/>
