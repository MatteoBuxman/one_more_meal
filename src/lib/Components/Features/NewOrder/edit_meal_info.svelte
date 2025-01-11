<script lang="ts">
  import type { Meal, OneMoreMealPackagingFlowState } from "$lib/Types/meals";
  import { getContext } from "svelte";
  import ModalPopupMobile from "../../Utilities/modal_popup_mobile.svelte";
  import { clampString } from "$lib/Logic/clamp_string";

  const contextState = getContext<OneMoreMealPackagingFlowState>(
    "add_meal_flow_state"
  );

  let {
    isOpen = $bindable(),
    meal_configuration,
    handleClose,
  }: {
    isOpen: boolean;
    meal_configuration: Meal;
    handleClose: () => void;
  } = $props();

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
      (meal) => meal.ids[0] === meal_configuration.ids[0]
    ) as Meal;

    meal.name = localName;
    meal.description = localDescription;
    meal.quantity = localAmount;

    handleClose();
  }

  function handleMealDelete() {
    const index = contextState.addedMeals.findIndex(
      (meal) => meal.ids[0] === meal_configuration.ids[0]
    );
    contextState.addedMeals.splice(index, 1);
    handleClose();
  }
</script>

<ModalPopupMobile bind:isOpen onClose={exitClose}>
  <div class="space-y-4 mt-6 px-5">
    <h1 class="font-bold text-xl">Edit.</h1>
    <div class="flex flex-col gap-2">
      <h2 class="text-sm">Meal IDs</h2>
      <div class="grid grid-cols-3 gap-2">
        {#each meal_configuration.ids as uuid}
          <span class="badge badge-primary text-xs">
            {clampString(uuid, 8)}
          </span>
        {/each}
      </div>
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
        <p class="text-sm">{localAmount} meals.</p>
      </div>

      <button
        type="submit"
        class="w-full py-3 text-white font-medium rounded-lg transition-colors"
        class:bg-red-500={!hasChanged}
        class:bg-red-600={!hasChanged && ":hover"}
        class:bg-indigo-600={hasChanged}
        class:bg-indigo-700={hasChanged && ":hover"}
      >
        {hasChanged ? "Save Changes" : "Delete"}
      </button>
    </form>
  </div>
</ModalPopupMobile>
