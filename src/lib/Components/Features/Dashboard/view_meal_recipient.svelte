<script lang="ts">
  import { Check, CircleX, Clock } from "lucide-svelte";
  import ModalPopupMobile from "../Utilities/modal_popup_mobile.svelte";
  import RandomFoodIcon from "../Utilities/random_food_icon.svelte";
  import type { MealRecipient } from "$lib/Types/meals";
  import { getContext } from "svelte";
  import type { Order } from "$lib/Types/orders";
  import { clampString } from "$lib/Logic/clamp_string";

  let isOpen = $state(false);

  let order = getContext("order") as Order;

  let {
    mealRecipient,
    orderStatus,
  }: { mealRecipient: MealRecipient; orderStatus: string } = $props();
</script>

<button onclick={() => (isOpen = true)}>
  {#if orderStatus === "cancelled"}
    <div class="flex badge badge-error text-sm gap-2">
      <CircleX size={16} class="text-white" />
      <span class="">
        {clampString(mealRecipient.id, 8)}
      </span>
    </div>
  {:else if orderStatus === "completed" || mealRecipient.delivered}
    <div class="flex badge badge-success text-sm gap-2">
      <Check size={16} class="" />
      <span class="">
        {clampString(mealRecipient.id, 8)}
      </span>
    </div>
  {:else}
    <div class="flex badge badge-warning text-sm gap-2">
      <Clock size={16} class="" />
      <span class="">
        {clampString(mealRecipient.id, 8)}
      </span>
    </div>
  {/if}
</button>

<ModalPopupMobile bind:isOpen destroyChildrenOnClose={true}>
  <div class="p-6 space-y-6">
    <div class="flex flex-col">
      <span class="text-sm text-gray-500">Meal ID</span>
      <span class="font-mono font-bold text-sm mt-1">{mealRecipient?.id}</span>
    </div>
    <div class="flex items-center space-x-2">
      <span
        class={`px-2.5 py-0.5 rounded-full text-sm font-medium
            ${mealRecipient.delivered ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
      >
        {mealRecipient.delivered ? "Delivered" : "Pending"}
      </span>
    </div>

    {#if mealRecipient.delivered}
      <div class="space-y-4">
        <div>
          <div class="text-sm font-medium text-gray-500">Recipient</div>
          <div class="mt-1 text-lg">
            {mealRecipient.recipientName}
            {mealRecipient.recipientSurname}
          </div>
        </div>
      </div>
    {/if}

    {#if mealRecipient?.acceptanceImgURL}
      <div class="space-y-2">
        <div class="text-sm font-medium text-gray-500">Acceptance Photo</div>
        <div class="relative rounded-lg overflow-hidden bg-gray-100">
          <img
            src={mealRecipient.acceptanceImgURL}
            alt="Delivery acceptance"
            class="object-cover"
          />
        </div>
      </div>
    {/if}

    {#if !mealRecipient.delivered}
      <div class="text-sm text-gray-500 italic">
        Recipient information will be available after delivery
      </div>
    {/if}
  </div>
</ModalPopupMobile>
