<script lang="ts">
  import {
    User,
    Clock,
    ChevronRight,
    CreditCard,
    LoaderPinwheel,
    MapPin,
    ChevronDown,
  } from "lucide-svelte";

  import RandomFoodIcon from "$lib/components/Utilities/random_food_icon.svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index";
  import { page } from "$app/stores";
  import type { Meal } from "$lib/Types/meals";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import type { OrderWithMeals } from "$lib/Types/orders";
  import { postOrder } from "$lib/Firebase/Firestore/post_data";
  import { useAuthStore, useFirestore } from "$lib/Firebase/firebase_init";
  import ErrorModal from "$lib/components/Errors/error_modal.svelte";
  import { Timestamp } from "firebase/firestore";
  import Button from "$lib/components/ui/button/button.svelte";
  import Card from "$lib/components/ui/card/card.svelte";
  import ModalPopupMobile from "$lib/components/Utilities/modal_popup_mobile.svelte";
  import LoadingBar from "$lib/components/Utilities/loading_bar.svelte";
  import type { FetchUserAddressesResult } from "$lib/Types/networking";

  let addedMeals: Meal[] = $state([]);
  let orderID: string;
  let isSubmitting = $state(false);
  let submissionError = $state(false);
  let deliveryInfo = $state(false);
  let pickupTime = $state(false);

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

    const order: OrderWithMeals = {
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

  const auth = useAuthStore();

  let addressesProm: Promise<FetchUserAddressesResult> =
    $page.data.userAddresses;
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
    {#await addressesProm}
      <LoadingBar />
    {:then addresses}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class="w-full mb-">
          <Card class=" p-4 shadow-lg">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"
                >
                  <MapPin class="h-5 w-5 text-blue-600" />
                </div>
                <div class="text-left">
                  <h3 class="font-medium text-sm">
                    {addresses.defaultAddress.street}
                  </h3>
                  <h3 class="font-medium text-sm">
                    {addresses.defaultAddress.suburb +
                      ", " +
                      addresses.defaultAddress.province +
                      ", " +
                      addresses.defaultAddress.postalCode}
                  </h3>
                </div>
              </div>
              <ChevronDown class="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-[375px]">
          <DropdownMenu.Group>
            <DropdownMenu.GroupHeading
              >Saved Locations</DropdownMenu.GroupHeading
            >
            <DropdownMenu.Separator />
            {#each addresses.addresses as address}
              <DropdownMenu.Item>
                
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div
                        class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"
                      >
                        <MapPin class="h-5 w-5 text-blue-600" />
                      </div>
                      <div class="text-left">
                        <h3 class="font-medium text-sm">
                          {address.street}
                        </h3>
                        <h3 class="font-medium text-sm">
                          {address.suburb +
                            ", " +
                            address.province +
                            ", " +
                            address.postalCode}
                        </h3>
                      </div>
                    </div>
                    
                  </div>
                
              </DropdownMenu.Item>
            {/each}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    {/await}

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
            All you cover are delivery costs and a service fee. We charge a rate
            proportional to your distance from our distribution center.
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

    <div
      class="flex items-center justify-center gap-2 mt-4 mb-8 text-sm text-gray-500"
    >
      <CreditCard />
      <span>Paying with •••• 2132</span>
    </div>
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
