<script lang="ts">
  import ScanQrcode from "./scan_qr code.svelte";
  import EnterMealInformation from "./enter_meal_information.svelte";
  import { getContext, onMount } from "svelte";
  import type { OneMoreMealPackagingFlowState } from "$lib/types/meals";
  import ModalPopupMobile from "../../Utilities/modal_popup_mobile.svelte";
  import { page } from "$app/stores";

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
    }else if (flowState.stateIndex == 2) {
      isOpen = true;
    }
  });

  onMount(()=>{
    //Check URL params
    const rndParam = $page.url.searchParams.get("rnd") || "";

    if (rndParam) {
      mealuuid = [rndParam];
      flowState.stateIndex = 2;
    }
  })
</script>

<ModalPopupMobile bind:isOpen onClose={handlePrematureClose} destroyChildrenOnClose={true}>
  
  {#snippet header()}
  <div class="flex flex-col gap-2">
    <h1 class="font-bold">Add new Meal</h1>
    {#if flowState.stateIndex === 1}
    <p class="text-sm text-gray-500">You will be asked about the meal after scanning its QR code.</p>
    {:else if flowState.stateIndex === 2}
      <p class="text-sm text-gray-500">Enter the meal information below.</p>
    {/if}
    <h3 class="text-sm font-bold">Step {flowState.stateIndex} of 2</h3>
  </div> 
  {/snippet}
  {#if flowState.stateIndex === 1}
    <ScanQrcode {scanSuccess} />
  {:else if flowState.stateIndex === 2}
    <EnterMealInformation ids={mealuuid} />
  {:else}
    <h1>An error occurred while adding your meal</h1>
  {/if}
</ModalPopupMobile>


