<script lang="ts">
  import ScanQrcode from "./scan_qr code.svelte";
  import type { Meal } from "$lib/Types/meals";
  import EnterMealInformation from "./enter_meal_information.svelte";

  type AddMealFlowProp = {
    flowState: number;
    addMealHandler: (meal: Meal) => void;
  };

  let { flowState, addMealHandler }: AddMealFlowProp = $props();
  let mealInformation: Meal = $state({
    uuid: "",
    name: "",
  });

  //Handler for successful QR scan
  function scanSuccess(rndString: string) {
    flowState = 2;
    mealInformation.uuid = rndString;
  }

  function handlePrematureClose() {
    (document.getElementById("qr_modal") as HTMLDialogElement).close()
  }
</script>

<dialog id="qr_modal" class="modal relative font-lexend">
  <div
    class="modal-box absolute w-full bottom-0 top-20 rounded-t-lg rounded-b-none"
  >
    <div class="flex justify-between items-center">
      <ul class="steps">
        <li class="step step-primary text-sm">Scan QR</li>
        <li class="step text-sm {flowState === 2 && 'step-primary'}">Meal Information</li>
      </ul>

      <button
        aria-label="Close modal"
        onclick={handlePrematureClose}
        ><svg
          class="ml-auto size-6 mb-5"
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
    {#if flowState === 1}
      <ScanQrcode {scanSuccess} />
    {:else if flowState === 2}
      <EnterMealInformation uuid={mealInformation.uuid} {addMealHandler}/>
    {:else}
      <h1>An error occurred while adding your meal</h1>
    {/if}
  </div>
</dialog>
