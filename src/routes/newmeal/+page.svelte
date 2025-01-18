<script lang="ts">
  import MenuPopup from "$lib/components/Utilities/menu_popup.svelte";
  import OneMoreMealPackagingFlow from "$lib/components/Features/NewOrder/one_more_meal_packaging_flow.svelte";
  import ContextProvider from "$lib/components/Utilities/context_provider.svelte";
  import type { OneMoreMealPackagingFlowState } from "$lib/Types/meals";
  import { QrCode, AlertCircle } from "lucide-svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import LoadingBar from "$lib/components/Utilities/loading_bar.svelte";
  import { v4 } from "uuid";
  import ModalPopupMobile from "$lib/components/Utilities/modal_popup_mobile.svelte";
  import GenerateQrcodes from "$lib/components/Features/NewOrder/generate_qrcodes.svelte";
  import { page } from "$app/stores";
  import Button from "$lib/components/ui/button/button.svelte";
  import Card from "$lib/components/ui/card/card.svelte";

  const menu_configuration = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  let loading = $state(true);

  let generateQrcodes = $state(false);

  let contextState = $state<OneMoreMealPackagingFlowState>({
    stateIndex: 0,
    addedMeals: [],
  });

  let contextValues = {
    add_meal_flow_state: contextState,
  };

  function handleQRScan() {
    contextState.stateIndex = 1;
  }

  function handleContinue() {
    const orderId = v4();

    goto(`/newmeal/${orderId}`);
  }

  onMount(() => {
    const isEmpty = (obj: Object) => Object.keys(obj).length === 0;

    //Check if there are any existing added meals
    const inSessionMeals = JSON.parse(
      sessionStorage.getItem("mostRecentMeals") || "{}"
    );

    if (isEmpty(inSessionMeals)) {
      contextState.addedMeals = [];
    } else {
      //Check if the added meals are still valid
      if (inSessionMeals.expiryTime < Date.now()) {
        contextState.addedMeals = [];
      } else {
        contextState.addedMeals = inSessionMeals.meals;
      }
    }

    loading = false;

    //Register the effect after onMount has run
    $effect(() => {
      //Update the sessionStorage when the added meals array changes
      sessionStorage.setItem(
        "mostRecentMeals",
        JSON.stringify({
          expiryTime: Date.now() + 1000 * 60 * 15, //15 minutes
          meals: contextState.addedMeals,
        })
      );
    });
    
  });
</script>



<div class="max-w-md mx-auto p-4 space-y-6">
  <p class="text-sm text-gray-500">
    Click below if your QR codes are already on your packaging.
  </p>
  <!-- Main Content -->
  <div class="space-y-4">
    <Card
      onclick={handleQRScan}
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
      onclick={() => (generateQrcodes = true)}
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

    {#if loading}
      <LoadingBar />
    {:else}
      <p class="text-gray-700 mt-8">
        <span class="font-bold"
          >{contextState.addedMeals.reduce(
            (acc, meal) => acc + meal.quantity,
            0
          )}</span
        > meals.
      </p>
    {/if}

    <ContextProvider {contextValues}>
      <OneMoreMealPackagingFlow />
    </ContextProvider>

    <ModalPopupMobile bind:isOpen={generateQrcodes}>
      <GenerateQrcodes />
    </ModalPopupMobile>

    <Button
      onclick={handleContinue}
      type="button"
      class="w-full"
      disabled={contextState.addedMeals.length === 0}
    >
      Continue
    </Button>
  </div>
</div>


