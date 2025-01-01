<script lang="ts">
  import ScanQrcode from "./scan_qr code.svelte";
  import EnterMealInformation from "./enter_meal_information.svelte";
  import { getContext } from "svelte";
  import type { OneMoreMealPackagingFlowState } from "$lib/Types/meals";

  let flowState = getContext<OneMoreMealPackagingFlowState>(
    "add_meal_flow_state"
  );

  let modal: HTMLDialogElement;

  //   let { flowState, addMealHandler } = $props();
  let mealuuid: string = $state("");

  function handlePrematureClose() {
    flowState.stateIndex = 0;
  }

  function scanSuccess(uuid: string) {
    mealuuid = uuid;
    flowState.stateIndex = 2;
  }

  $effect(() => {
    if (flowState.stateIndex == 1) {
      modal.showModal();
    } else if (flowState.stateIndex == 0) {
      modal.close();
    }
  });

</script>

<dialog id="qr_modal" class="modal relative font-lexend" bind:this={modal}>
  <div
    class="modal-box absolute w-full bottom-0 top-20 rounded-t-lg rounded-b-none"
  >
    <div class="flex justify-between items-center">
      <ul class="steps">
        <li class="step step-primary text-sm">Scan QR</li>
        <li class="step text-sm {flowState.stateIndex === 2 && 'step-primary'}">
          Meal Information
        </li>
      </ul>

      <button aria-label="Close modal" onclick={handlePrematureClose}
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
    {#if flowState.stateIndex === 1}
      <ScanQrcode {scanSuccess} />
    {:else if flowState.stateIndex === 2}
      <EnterMealInformation uuid={mealuuid} />
    {:else}
      <h1>An error occurred while adding your meal</h1>
    {/if}
  </div>
</dialog>
