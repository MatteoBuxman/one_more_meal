<script lang="ts">

  import { QrCode, AlertCircle } from "lucide-svelte";
  import { goto } from "$app/navigation";
  import { getContext, onMount } from "svelte";
  import LoadingBar from "$lib/components/Utilities/loading_bar.svelte";
  import ModalPopupMobile from "$lib/components/Utilities/modal_popup_mobile.svelte";
  import GenerateQrcodes from "$lib/components/Features/NewOrder/generate_qrcodes.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Card from "$lib/components/ui/card/card.svelte";
  import AddedMealCard from "$lib/components/Features/NewOrder/added_meal_card.svelte";
  import type { CurrentOrderState } from "$lib/components/Features/NewOrder/current_order_provider/current_order_state.svelte";
  import { page } from "$app/stores";
  import ScanQrcode from "$lib/components/Features/NewOrder/scan_qr code.svelte";
  import EnterMealInformation from "$lib/components/Features/NewOrder/enter_meal_information.svelte";

  


  let currentOrderState = getContext<CurrentOrderState>("current_order_state");

    //The current position of the add new order flow
  let state_index : 0 | 1 | 2 = $state(0); //0 = Home Screen, 1 = Scan QR Code, 2 = Enter Meal Information

  //Add new order modal
  let add_new_order = $state(false);

  $effect(()=>{
    add_new_order = state_index !== 0;
  })

  //Generate new qr codes modal
  let generate_qr_codes = $state(false);
  
  let initital_meal_id = $state("");


  // Check the url parameters to see if the user scanned a QR code from their camera app and open the add new order modal if this is the case.
  onMount(()=>{
    //Check URL params
    const rndParam = $page.url.searchParams.get("rnd") || "";

    if (rndParam) {
      initital_meal_id = rndParam;
      state_index = 2;
    }
  })

  function scanSuccess(uuid: string){
    //Validate the code has not been scanned already
    try {
      currentOrderState.checkUniqueMealID(uuid);
    } catch (e) {
      alert("This meal has already been added to the order. Please scan a different meal.");
      return true;
    }

    initital_meal_id = uuid;
    state_index = 2;

    return true;
  }

  function close(){
    state_index = 0;
  }

</script>



<div class="max-w-md mx-auto p-4 space-y-6">
  <p class="text-sm text-gray-500">
    Click below if your QR codes are already on your packaging.
  </p>
  <!-- Main Content -->
  <div class="space-y-4">
    <Card
      onclick={()=>state_index = 1}
      class="w-full card p-6 flex flex-col items-center justify-center space-y-4 hover:bg-gray-50 cursor-pointer border-2 border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      aria-label="Scan QR code"
    >
      <div
        class="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center"
      >
        <QrCode size={24} class="text-indigo-600" />
      </div>
      <div class="text-center">
        <h2 class="text-lg font-semibold text-gray-900">Scan QR code</h2>
        <p class="text-sm text-gray-500 mt-1">
          Scan the QR code on your meal packaging.
        </p>
      </div>
    </Card>

    <p class="text-sm text-gray-500">
      Click below if you need to get your meal QR codes.
    </p>

    <Card
      onclick={() => (generate_qr_codes = true)}
      class="w-full card p-6 flex flex-col items-center justify-center space-y-4 hover:bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      aria-label="Get QR codes help"
    >
      <div
        class="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center"
      >
        <AlertCircle size={24} class="text-gray-600" />
      </div>
      <div class="text-center">
        <h2 class="text-lg font-semibold text-gray-900">
          Don't have your QR codes yet?
        </h2>
        <p class="text-sm text-gray-500 mt-1">
          Generate your own and apply them to your meals.
        </p>
      </div>
    </Card>

    {#if currentOrderState.isLoading}
      <LoadingBar />
    {:else}
      <p class="text-gray-700 mt-8">
        <span class="font-bold"
          >{currentOrderState.order.order_size}</span
        > meals.
      </p>
    {/if}

    <!-- The added meal list -->
    <div class="mt-3 font-lexend flex flex-col gap-3">
      {#each currentOrderState.order.meals as meal_configuration}
        <AddedMealCard {meal_configuration} />
      {/each}
    </div>

    <!-- Popup for adding scanning and adding a new meal to the order -->
    <ModalPopupMobile bind:isOpen={add_new_order} destroyChildrenOnClose={true} onClose={close}>
  
      {#snippet header()}
      <div class="flex flex-col gap-2">
        <h1 class="font-bold">Add new Meal</h1>
        {#if state_index === 1}
        <p class="text-sm text-gray-500">You will be asked about the meal after scanning its QR code.</p>
        {:else if state_index === 2}
          <p class="text-sm text-gray-500">Enter the meal information below.</p>
        {/if}
        <h3 class="text-sm font-bold">Step {state_index} of 2</h3>
      </div> 
      {/snippet}
      {#if state_index === 1}
        <ScanQrcode {scanSuccess} />
      {:else if state_index === 2}
        <EnterMealInformation {initital_meal_id} {close}/>
      {:else}
        <h1>An error occurred while adding your meal</h1>
      {/if}
    </ModalPopupMobile>

    <!-- Popup for requesting a set of new meal QR codes from /api/generatecodes -->
    <ModalPopupMobile bind:isOpen={generate_qr_codes}>
      <GenerateQrcodes />
    </ModalPopupMobile>

    <!-- Continue to the order confirmation page -->
    <Button
      onclick={()=> goto(`/newmeal/${currentOrderState.order.id}`)}
      type="button"
      class="w-full"
      disabled={currentOrderState.order.is_empty}
    >
      Continue
    </Button>
  </div>
</div>


