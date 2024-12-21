<script lang="ts">
  import MealAddingSelector from "../meal_adding_selector.svelte";
  import AddMealInformation from "../add_meal_information.svelte";
  import type { Meal } from "$lib/Types/meals";

  let flowState: 0 | 1 | 2 = $state(0);
  let addedMeals: Meal[] = $state([]);

  //Modal open
  function handleClick() {
    flowState = 1;
    (document.getElementById("qr_modal") as HTMLDialogElement).showModal();
  }

  //Handle new meal recieved from the add meal flow
  function addMealHandler(meal: Meal) {
    addedMeals.push(meal);
    flowState = 0;
    (document.getElementById("qr_modal") as HTMLDialogElement).close();
  }

  function handleContinue() {
    console.log(addedMeals);
  }
</script>

<div class="font-lexend p-3">
  <div class="flex flex-col gap-2">
    <h2 class="font-light text-sm">
      Please scan the QR code on the side of each meal.
    </h2>
    <button class="btn btn-primary" onclick={handleClick}>Open scanner</button>
  </div>
  <MealAddingSelector {addedMeals} />
</div>

<AddMealInformation {flowState} {addMealHandler} />

<div class="flex justify-center p-3">
    <button class="btn btn-primary" onclick={handleContinue} disabled>Continue</button>
</div>
