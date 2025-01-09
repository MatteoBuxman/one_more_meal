<script lang="ts">
  import ScanQrcode from "./scan_qr code.svelte";
  import EnterMealInformation from "./enter_meal_information.svelte";
  import { getContext } from "svelte";
  import type { OneMoreMealPackagingFlowState } from "$lib/Types/meals";
  import ModalPopupMobile from "../Utilities/modal_popup_mobile.svelte";

  let flowState = getContext<OneMoreMealPackagingFlowState>(
    "add_meal_flow_state"
  );

  let mealuuid: Array<string> = $state([]);
  let isOpen = $state(false);

  function handlePrematureClose() {
    flowState.stateIndex = 0;
  }

  function scanSuccess(uuid: string) {
    mealuuid = [uuid];
    flowState.stateIndex = 2;
    return false;
  }

  $effect(() => {
    if (flowState.stateIndex == 1) {
      isOpen = true;
    } else if (flowState.stateIndex == 0) {
      isOpen = false;
    }
  });
</script>

<ModalPopupMobile bind:isOpen onClose={handlePrematureClose}>
  <div class="flex justify-between items-center">
    <ul class="steps">
      <li class="step step-primary text-sm">Scan QR</li>
      <li class="step text-sm {flowState.stateIndex === 2 && 'step-primary'}">
        Meal Information
      </li>
    </ul>
  </div>
  {#if flowState.stateIndex === 1}
    <ScanQrcode {scanSuccess} />
  {:else if flowState.stateIndex === 2}
    <EnterMealInformation ids={mealuuid} />
  {:else}
    <h1>An error occurred while adding your meal</h1>
  {/if}
</ModalPopupMobile>


