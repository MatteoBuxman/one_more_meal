<script lang="ts">
  import MenuPopup from "$lib/Components/menu_popup.svelte";
  import OneMoreMealPackagingFlow from "$lib/Components/Flows/one_more_meal_packaging_flow.svelte";
  import ContextProvider from "$lib/Components/context_provider.svelte";
  import type { OneMoreMealPackagingFlowState } from "$lib/Types/meals";
  import { QrCode, AlertCircle } from "lucide-svelte";
  import { goto } from "$app/navigation";
  import { randomString } from "$lib/Logic/random_string";
  import { onMount } from "svelte";

  const menu_configuration = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

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
    const orderId = randomString(10);

    sessionStorage.setItem(
      "addedMeals",
      JSON.stringify({
        //Valid for 15 minutes
        expiryTime: Date.now() + 1000 * 60 * 15,
        addedMeals: contextState.addedMeals,
      })
    );

    goto(`/newmeal/${orderId}`);
  }

  onMount(() => {
    //Check if there are any existing added meals
    const inSessionMeals = JSON.parse(sessionStorage.getItem("addedMeals") || "[]");

    //Quite a hack of a solution to deal with the state where there is no "addedMeals" in session storage.
    const expiryTime = inSessionMeals.expiryTime || Date.now() - 100;

    //Check if the added meals are still valid
    if (expiryTime < Date.now()) {
      contextState.addedMeals = [];
    } else {
      contextState.addedMeals = inSessionMeals.addedMeals;
    }

   
  });
</script>

<nav class="navbar p-4">
  <div class="flex flex-1">
    <img src="/main_logo_pinkaccent.png" alt="logo_image" class="w-7" />
    <div class="divider divider-horizontal m-0"></div>
    <a class="text-xl font-lexend" aria-label="home_link" href="/"
      >Add New Meal</a
    >
  </div>
  <MenuPopup {menu_configuration} />
</nav>

<div class="max-w-md mx-auto p-4 space-y-6">
  <!-- Main Content -->
  <div class="space-y-4">
    <button
      type="button"
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
    </button>

    <button
      type="button"
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
    </button>

    <p class="text-gray-700 mt-8">
      <span class="font-bold">{contextState.addedMeals.length}</span> added
    </p>

    <ContextProvider {contextValues}>
      <OneMoreMealPackagingFlow />
    </ContextProvider>
    <button
      onclick={handleContinue}
      type="button"
      class="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-lg py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      disabled={contextState.addedMeals.length === 0}
    >
      Continue
    </button>
  </div>
</div>

<style>
  .card {
    @apply bg-white rounded-lg shadow-sm border border-gray-200;
  }
</style>
