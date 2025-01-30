<script lang="ts">
  import type { Meal } from "$lib/types/meals";
  import { getContext } from "svelte";
  import ModalPopupMobile from "../../Utilities/modal_popup_mobile.svelte";
  import { clampString } from "$lib/function_utilities/clamp_string";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import type { CurrentOrderState } from "./current_order_provider/current_order_state.svelte";

  const currentOrder = getContext<CurrentOrderState>("current_order_state");

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
    const meal = currentOrder.order.meals.find(
      (meal) => meal.ids[0] === meal_configuration.ids[0]
    ) as Meal;

    meal.name = localName;
    meal.description = localDescription;
    meal.quantity = localAmount;

    handleClose();
  }

  function handleMealDelete() {
    const index = currentOrder.order.meals.findIndex(
      (meal) => meal.ids[0] === meal_configuration.ids[0]
    );

    currentOrder.removeMeal(index);

    handleClose();
  }
</script>

<ModalPopupMobile bind:isOpen onClose={exitClose}>
  
    {#snippet header()}
      <h1 class="font-bold text-black text-xl">Edit.</h1>
      <div class="flex flex-col gap-2">
        <h2 class="text-sm">Meal IDs</h2>
        <div class="grid grid-cols-3 gap-2">
          {#each meal_configuration.ids as uuid}
            <Badge variant="outline" class="text-sm">
              {clampString(uuid, 8)}
            </Badge>
          {/each}
        </div>
      </div>
    {/snippet}

    <form onsubmit={handleUpdate} class="space-y-6 mt-4">
      <div class="space-y-2">
        <Label class="font-medium text-gray-700"
          >Meal Name
          <Input
            onkeydown={markHasChanged}
            type="text"
            bind:value={localName}
            class="mt-2"
            placeholder="Enter the meal name"
            required
          />
        </Label>
      </div>

      <div class="space-y-2">
        <Label class="font-medium text-gray-700"
          >Description (Optional)
          <Textarea
            onkeydown={markHasChanged}
            bind:value={localDescription}
            class="mt-2 text-sm"
            placeholder="Add a description"
          ></Textarea>
        </Label>
      </div>

      <div class="space-y-2">
        <p class="text-sm text-black font-bold">{localAmount} meals.</p>
      </div>

      <Button
        type="submit"
        class="w-full py-3 text-white font-medium rounded-lg transition-colors {hasChanged ? 'bg-indigo-700 hover:bg-indigo-800' : 'bg-red-700 hover:bg-red-800'}"
      >
        {hasChanged ? "Save Changes" : "Delete"}
      </Button>
      
        
    </form>
  
</ModalPopupMobile>
