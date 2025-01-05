<script lang="ts">
  import type { Meal, OneMoreMealPackagingFlowState } from "$lib/Types/meals";
  import { getContext } from "svelte";
  import ModalPopupMobile from "./modal_popup_mobile.svelte";

  const contextState = getContext<OneMoreMealPackagingFlowState>(
    "add_meal_flow_state"
  );

  let {
    isOpen = $bindable(),
    meal_configuration,
    handleClose,
  }: {  isOpen: boolean, meal_configuration: Meal; handleClose: () => void } =
    $props();

  let hasChanged = $state<boolean>(false);

  //Local variables to allow for resetting
  let localName = $state(meal_configuration.name);
  let localDescription = $state(meal_configuration.description);
  let localAmount = $state(meal_configuration.quantity);

  // Reset function
  function resetForm() {
    localName = meal_configuration.name;
    localDescription = meal_configuration.description;
    localAmount = meal_configuration.quantity;
  }

  function markHasChanged() {
    if (!hasChanged) {
      hasChanged = true;
    }
  }

  function exitClose() {
    resetForm();
    hasChanged = false;
    handleClose();
  }

  function handleUpdate(e: Event) {
    e.preventDefault();
    if (hasChanged) {
      handleMealUpdate();
    } else {
      handleMealDelete();
    }
  }

  function handleMealUpdate() {
    const meal = contextState.addedMeals.find(
      (meal) => meal.uuid === meal_configuration.uuid
    ) as Meal;

    meal.name = localName;
    meal.description = localDescription;
    meal.quantity = localAmount;

    handleClose();
  }

  function handleMealDelete() {
    const index = contextState.addedMeals.findIndex(
      (meal) => meal.uuid === meal_configuration.uuid
    );
    contextState.addedMeals.splice(index, 1);
    handleClose();
  }

</script>

<ModalPopupMobile bind:isOpen onClose={exitClose}>
  <div class="space-y-6 mt-6">
    <div class="inline-block px-4 py-2 bg-gray-100 rounded-full">
      <span class="text-sm text-gray-600"
        >Meal ID: {meal_configuration.uuid}</span
      >
    </div>

    <form onsubmit={handleUpdate} class="space-y-6">
      <div class="space-y-2">
        <label class="font-medium text-gray-700"
          >Meal Name
          <input
            onkeydown={markHasChanged}
            type="text"
            bind:value={localName}
            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter the meal name"
            required
          />
        </label>
      </div>

      <div class="space-y-2">
        <label class="font-medium text-gray-700"
          >Description (Optional)
          <textarea
            onkeydown={markHasChanged}
            bind:value={localDescription}
            class="text-sm w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Add a description"
            rows="4"
          ></textarea>
        </label>
      </div>

      <div class="space-y-2">
        <label class="font-medium text-gray-700"
          >Amount of Meals
          <input
            onkeydown={markHasChanged}
            type="number"
            bind:value={localAmount}
            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
      </div>

      <button
        type="submit"
        class="w-full py-3 text-white font-medium rounded-lg transition-colors"
        class:bg-red-500={!hasChanged}
        class:bg-red-600={!hasChanged && ":hover"}
        class:bg-indigo-600={hasChanged}
        class:bg-indigo-700={hasChanged && ":hover"}
      >
        {hasChanged ? "Save Changes" : "Delete Meal"}
      </button>
    </form>
  </div>
</ModalPopupMobile>
