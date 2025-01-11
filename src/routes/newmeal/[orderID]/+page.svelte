<script lang="ts">
  import {
    ArrowLeft,
    User,
    Clock,
    ChevronRight,
    CreditCard,
    Pencil,
    LoaderPinwheel,
  } from "lucide-svelte";

  import RandomFoodIcon from "$lib/Components/Utilities/random_food_icon.svelte";

  import { page } from "$app/stores";
  import type { Meal } from "$lib/Types/meals";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import type { OrderWithMeals } from "$lib/Types/orders";
  import { postOrder } from "$lib/Firebase/Firestore/post_data";
  import { useFirestore } from "$lib/Firebase/firebase_init";
  import ErrorModal from "$lib/Components/Errors/error_modal.svelte";
  import { Timestamp } from "firebase/firestore";

  let userName = "Matteo Buxman";
  let userPhone = "082 611 0091";

  let addedMeals: Meal[] = $state([]);
  let orderID: string;
  let isSubmitting = $state(false);
  let submissionError = $state(false);

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
  });

  function handleReturn() {
    goto(`/newmeal`);
  }

  async function handleComplete() {
    isSubmitting = true;

    const order : OrderWithMeals = {
      id: orderID,
      meals: addedMeals,
      status: "ordered",
      orderSize: addedMeals.reduce((acc, meal) => acc + meal.quantity, 0),
      created_at: Timestamp.now(),
      updated_at: null,
      completed_at: null,
    };

    try {
      await postOrder(firestore, "lXBHaMmIqs5UC11ymLT1xgTdg9lA", order);

      sessionStorage.removeItem("mostRecentMeals");
      goto(`/newmeal/${orderID}/confirmed`);
    } catch (e) {
      isSubmitting = false;
      submissionError = true;
    }
  }
</script>

<ErrorModal
  error_message="Error submitting your order"
  bind:isOpen={submissionError}
/>

<div>
  <!-- Header -->
  <div
    class="p-3 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10"
  >
    <div class="flex items-center space-x-4">
      <button
        onclick={handleReturn}
        class="hover:bg-gray-100 p-2 rounded-full transition-colors"
      >
        <ArrowLeft class="w-5 h-5" />
      </button>
      <h1 class="text-xl font-bold">Complete Pickup</h1>
    </div>
  </div>

  <!-- New Contact Information Section -->
  <div class="px-4 mt-6">
    <div
      class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"
          >
            <User class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 class="font-medium">{userName}</h3>
            <p class="text-sm text-gray-500">{userPhone}</p>
          </div>
        </div>
        <button class="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Pencil class="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  </div>

  <!-- Store Info Card -->
  <div
    class="mx-4 mt-6 bg-white rounded-b-2xl shadow-lg border border-gray-100"
  >
    <div class="bg-gray-100">
      <iframe
        class="w-full h-64"
        title="pickup location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2126.998692818037!2d28.02948800375621!3d-26.134072055859445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950cbd305528d3%3A0x77ff15438b3f8073!2s28%20Northumberland%20Ave%2C%20Craighall%20Park%2C%20Johannesburg%2C%202196!5e0!3m2!1sen!2sza!4v1734812803730!5m2!1sen!2sza"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

    <div class="p-4 space-y-4">
      <div class="flex items-center gap-4 text-sm">
        <div class="flex items-center gap-2">
          <User class="w-4 h-4 text-gray-500" />
          <span>1.6 km away</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Pickup Time Section -->
  <div class="px-3 mt-6">
    <a
      class="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
      href="/pickupinformation"
    >
      <div class="flex items-center gap-3">
        <Clock class="w-5 h-5 text-gray-500 shrink-0" />
        <div class="text-left">
          <p class="font-medium">Pickup time</p>
          <p class="text-sm text-gray-600">
            Orders placed before 3pm will be picked up same day.
          </p>
        </div>
      </div>
      <ChevronRight class="w-5 h-5 text-gray-400 shrink-0" />
    </a>
  </div>

  <!-- Costs Section -->
  <div class="px-3 mt-6">
    <a
      class="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
      href="/pickupinformation"
    >
      <div class="flex items-center gap-3">
        <Clock class="w-5 h-5 text-gray-500 shrink-0" />
        <div class="text-left">
          <p class="font-medium">Delivery Costs</p>
          <p class="text-sm text-gray-600">
            All you cover are delivery costs and a service fee. We charge a rate
            proportional to your distance from our distribution center.
          </p>
        </div>
      </div>
      <ChevronRight class="w-5 h-5 text-gray-400 shrink-0" />
    </a>
  </div>

  <!-- Order Summary -->
  <div class="px-3 mt-6">
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
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
  <div class="px-6 mt-4">
    <div
      class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3"
    >
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Subtotal</span>
        <span>R 38.50</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Service fee</span>
        <span>R 10.00</span>
      </div>
      <div class="flex justify-between items-center pt-2 border-t font-bold">
        <span>Total</span>
        <span>R 48.50</span>
      </div>
    </div>

    <button
      onclick={handleComplete}
      class="text-center w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-light shadow-sm transition-all active:scale-[0.98]"
    >
      {#if isSubmitting}
        <div class="text-white flex items-center justify-center gap-2">
          <p class="font-light">Submitting</p>
          <LoaderPinwheel class="w-6 h-6 animate-spin" />
        </div>
      {:else}
        <p>Complete Order</p>
      {/if}
    </button>

    <div
      class="flex items-center justify-center gap-2 mt-4 mb-8 text-sm text-gray-500"
    >
      <CreditCard />
      <span>Paying with •••• 2132</span>
    </div>
  </div>
</div>

<style>
</style>
