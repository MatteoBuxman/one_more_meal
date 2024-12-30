<script lang="ts">
  import type { Meal, OneMoreMealPackagingFlowState } from "$lib/Types/meals";
  import { getContext } from "svelte";

  let modal: HTMLDialogElement;

  const contextState = getContext<OneMoreMealPackagingFlowState>(
    "add_meal_flow_state"
  );

  let {
    open,
    meal_configuration,
    handleClose,
  }: { open: boolean; meal_configuration: Meal; handleClose: () => void } =
    $props();

  let hasChanged = $state<boolean>(false);

  //Local variables to allow for resetting
  let localName = $state(meal_configuration.name);
  let localDescription = $state(meal_configuration.description);
  let localAmount = $state(meal_configuration.amount);

  // Reset function
  function resetForm() {
    localName = meal_configuration.name;
    localDescription = meal_configuration.description;
    localAmount = meal_configuration.amount;
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
    meal.amount = localAmount;

    handleClose();
  }

  function handleMealDelete() {
    const index = contextState.addedMeals.findIndex(
      (meal) => meal.uuid === meal_configuration.uuid
    );
    contextState.addedMeals.splice(index, 1);
    handleClose();
  }

  $effect(() => {
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  });
</script>

<dialog class="modal relative font-lexend" bind:this={modal}>
  <div
    class="modal-box absolute w-full bottom-0 top-20 rounded-t-lg rounded-b-none"
  >
    <div class="flex justify-end items-center">
      <button aria-label="Close modal" onclick={exitClose}
        ><svg
          class="ml-auto size-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg></button
      >
    </div>

    <div class="space-y-6 mt-6">
      <div class="inline-block px-4 py-2 bg-gray-100 rounded-full">
        <span class="text-sm text-gray-600"
          >Meal ID: {meal_configuration.uuid}</span
        >
      </div>

      <form onsubmit={handleUpdate} class="space-y-6">
        <div class="space-y-2">
          <label class="text-lg font-medium text-gray-700">Meal Name</label>
          <input
            onkeydown={markHasChanged}
            type="text"
            bind:value={localName}
            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter the meal name"
            required
          />
        </div>

        <div class="space-y-2">
          <label class="text-lg font-medium text-gray-700"
            >Description (Optional)</label
          >
          <textarea
            onkeydown={markHasChanged}
            bind:value={localDescription}
            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Add a description"
            rows="4"
          ></textarea>
        </div>

        <div class="space-y-2">
          <label class="text-lg font-medium text-gray-700"
            >Amount of Meals</label
          >
          <input
            onkeydown={markHasChanged}
            type="number"
            bind:value={localAmount}
            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 text-white font-medium rounded-lg transition-colors"
          class:bg-red-500={!hasChanged}
          class:bg-red-600={!hasChanged && ':hover'}
          class:bg-indigo-600={hasChanged}
          class:bg-indigo-700={hasChanged && ':hover'}
        >
          {hasChanged ? "Save Changes" : "Delete Meal"}
        </button>
      </form>
    </div>
  </div>
</dialog>
