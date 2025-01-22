<script lang="ts">
  import {
    User,
    ChevronRight,
    CreditCard,
    LoaderPinwheel,
  } from "lucide-svelte";

  import RandomFoodIcon from "$lib/components/Utilities/random_food_icon.svelte";
  import { page } from "$app/stores";
  import type { Meal } from "$lib/types/meals";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import type { OrderWithMeals } from "$lib/types/orders";
  import { postOrder } from "$lib/firebase/firestore/post_data";
  import { useAuthStore, useFirestore } from "$lib/firebase/firebase_init";
  import ErrorModal from "$lib/components/Errors/error_modal.svelte";
  import {
    collection,
    getDocs,
    query,
    Timestamp,
    where,
  } from "firebase/firestore";
  import Button from "$lib/components/ui/button/button.svelte";
  import Card from "$lib/components/ui/card/card.svelte";
  import ModalPopupMobile from "$lib/components/Utilities/modal_popup_mobile.svelte";
  import LoadingBar from "$lib/components/Utilities/loading_bar.svelte";
  import { fetchUserAddresses } from "$lib/firebase/firestore/fetch_data";
  import LocationDropdownSelector from "$lib/components/Features/NewOrder/location_dropdown_selector/location_dropdown_selector.svelte";
  import type { AddedPaymentCard } from "$lib/types/payments";
  import {
    LocationDropdownSelectorState,
    useLocationDropdownSelectorState,
  } from "$lib/components/Features/NewOrder/location_dropdown_selector/location_dropdown_selector_state.svelte";

  let addedMeals: Meal[] = $state([]);
  let orderID: string;
  let isSubmitting = $state(false);
  let submissionError = $state(false);
  let deliveryInfo = $state(false);
  let pickupTime = $state(false);
  let currentCard: AddedPaymentCard | null = $state(null);

  const firestore = useFirestore();

  onMount(() => {
    orderID = $page.params.orderID;

    const isEmpty = (obj: Object) => Object.keys(obj).length === 0;

    //Check if there are any existing added meals
    const inSessionMeals = JSON.parse(
      sessionStorage.getItem("mostRecentMeals") || "{}"
    );

    if (isEmpty(inSessionMeals)) {
      goto(`/newmeal`);
    } else {
      //Check if the added meals are still valid
      if (inSessionMeals.expiryTime < Date.now()) {
        goto(`/newmeal`);
      } else {
        addedMeals = inSessionMeals.meals;
      }
    }

    fetchDefaultCard();
    loadAddresses();
  });

  function handleReturn() {
    goto(`/newmeal`);
  }

  async function handleComplete() {
    isSubmitting = true;

    const order: OrderWithMeals = {
      id: orderID,
      meals: addedMeals,
      status: "ordered",
      orderSize: addedMeals.reduce((acc, meal) => acc + meal.quantity, 0),
      created_at: Timestamp.now(),
      updated_at: null,
      completed_at: null,
      pickup_location: locationState!.getSelectedLocation().address_id,
    };

    try {

      const response = await fetch("/api/chargetoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: currentCard?.tokenID,
          amount: 5000,
          item_name: "meal_pickup",
          user_id: $auth.user?.uid,
          order_id: orderID,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }


      await postOrder(firestore, $auth.user?.uid || "", order);

      sessionStorage.removeItem("mostRecentMeals");
      goto(`/newmeal/${orderID}/confirmed`);
    } catch (e) {
      isSubmitting = false;
      submissionError = true;
      console.log(e);
    }
  }

  const auth = useAuthStore();

  async function fetchDefaultCard() {
    const collectionRef = collection(
      firestore,
      "Users",
      $auth.user?.uid || "",
      "added_cards"
    );

    const q = query(collectionRef, where("default", "==", true));

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    currentCard =  {...snapshot.docs[0].data(), tokenID: snapshot.docs[0].id} as AddedPaymentCard;
  }

  let locationState: LocationDropdownSelectorState | null = $state(null);

  async function loadAddresses() {
    const addresses = await fetchUserAddresses(
      firestore,
      $auth.user?.uid ?? ""
    );
    locationState = useLocationDropdownSelectorState(addresses);
  }
</script>

<ErrorModal
  error_message="Error submitting your order"
  bind:isOpen={submissionError}
/>

<div class="p-3">
  <Button onclick={handleReturn} class="w-full">Go Back</Button>
</div>

<div class="mt-2">
  <!-- Header -->
  <div
    class="p-3 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10"
  >
    <div class="flex flex-col justify-between">
      <h1 class="text-lg font-bold">Complete Meal Pickup Request</h1>
    </div>
  </div>

  <!-- New Contact Information Section -->
  <div class="px-4 mt-6">
    <div
      class="bg-white rounded shadow-sm border border-gray-100 p-4 space-y-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"
          >
            <User class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 class="font-medium">{$auth.user?.displayName}</h3>
            <p class="text-sm text-gray-500">{$auth.user?.email}</p>
            <p class="text-sm text-gray-500">{$auth.user?.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Store Info Card -->

  <div class="mx-4 mt-6 bg-white rounded-b shadow-lg border border-gray-100">
    <h1 class="text-black font-bold p-3 text-sm">Pickup location</h1>
    {#if !locationState}
      <LoadingBar />
    {:else}
      <LocationDropdownSelector state={locationState} />
    {/if}
  </div>

  <!-- Pickup Time Section -->
  <div class="px-3 mt-6">
    <Card
      class="w-full bg-white rounded p-4 shadow-sm border border-gray-100 flex items-center justify-between"
      onclick={() => {
        pickupTime = true;
      }}
    >
      <div class="flex items-center gap-3">
        <div class="text-left">
          <p class="font-medium">Pickup time</p>
          <p class="text-sm text-gray-600">
            Orders placed before 3pm will be picked up same day.
          </p>
        </div>
      </div>
      <ChevronRight class="w-5 h-5 text-gray-400 shrink-0" />
    </Card>
  </div>

  <!-- Costs Section -->
  <div class="px-3 mt-6">
    <Card
      class="w-full bg-white rounded p-4 shadow-sm border border-gray-100 flex items-center justify-between"
      onclick={() => {
        deliveryInfo = true;
      }}
    >
      <div class="flex items-center gap-3">
        <div class="text-left">
          <p class="font-medium">Delivery Costs</p>
          <p class="text-sm text-gray-600">
            All you cover are delivery costs and a service fee. We charge a flat rate.
          </p>
        </div>
      </div>
      <ChevronRight class="w-5 h-5 text-gray-400 shrink-0" />
    </Card>
  </div>

  <!-- Order Summary -->
  <div class="px-3 mt-6">
    <div class="bg-white rounded shadow-sm border border-gray-100 p-4">
      <h2 class="text-lg font-bold mb-4">Order Summary</h2>
      <div class="flex flex-col gap-3">
        {#if addedMeals.length === 0}
          <p class="text-gray-500">No meals added</p>
        {/if}
        {#each addedMeals as meal}
          <div class="flex items-center gap-4 pb-4">
            <div
              class=" bg-gray-100 rounded-full flex items-center justify-center size-12"
            >
              <RandomFoodIcon />
            </div>
            <div class="flex-1">
              <h3 class="font-medium">{meal.name}</h3>
              <p class="text-sm text-gray-600">
                {meal.quantity}
                {meal.quantity > 1 ? "meals" : "meal"}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Price & Payment -->
  <div class="px-3 mt-4">
    <div
      class="bg-white rounded shadow-sm border border-gray-100 p-4 space-y-3"
    >
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Pickup Fee</span>
        <span>R 40.00</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Service fee</span>
        <span>R 10.00</span>
      </div>
      <div class="flex justify-between items-center pt-2 border-t font-bold">
        <span>Total</span>
        <span>R 50.00</span>
      </div>
    </div>

    <Button
      onclick={handleComplete}
      class="text-center w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 font-light shadow-sm transition-all active:scale-[0.98]"
    >
      {#if isSubmitting}
        <div class="text-white flex items-center justify-center gap-2">
          <p class="font-light">Submitting</p>
          <LoaderPinwheel class="w-6 h-6 animate-spin" />
        </div>
      {:else}
        <p>Complete Order</p>
      {/if}
    </Button>

    {#if $auth.user}
      <div
        class="flex items-center justify-center gap-2 mt-4 mb-8 text-sm text-gray-500"
      >
        <CreditCard />
        {#if !currentCard}
          <LoadingBar />
        {:else}
          <span>Paying with {currentCard.cardName}</span>
        {/if}
      </div>
    {/if}
    <p class="text-sm text-gray-500 text-center">
      Change your selected payment method in account settings.
    </p>
  </div>
</div>

<ModalPopupMobile bind:isOpen={deliveryInfo}>
  {#snippet header()}
    <h1 class="font-bold text-black">Delivery Costs.</h1>
  {/snippet}
</ModalPopupMobile>

<ModalPopupMobile bind:isOpen={pickupTime}>
  {#snippet header()}
    <h1 class="font-bold text-black">Pickup Time.</h1>
  {/snippet}
</ModalPopupMobile>

<style>
</style>
