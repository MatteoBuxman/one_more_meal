<script lang="ts">
  import { Check, CircleX, User } from "lucide-svelte";
  import ModalPopupMobile from "../Utilities/modal_popup_mobile.svelte";
  import RandomFoodIcon from "../Utilities/random_food_icon.svelte";

  let isOpen = $state(false);

  let { uuid, imageURL }: { uuid: string; imageURL?: string } = $props();
</script>

<button onclick={() => (isOpen = true)}>
  {#if true}
    <div class="flex badge badge-success text-sm gap-2">
      <Check size={16} class="text-white" />
      <span class="">
        {uuid}
      </span>
    </div>
  {:else}
    <div class="flex badge badge-warning text-sm gap-2">
      <CircleX size={16} class="" />
      <span class="">
        {uuid}
      </span>
    </div>
  {/if}
</button>

<ModalPopupMobile bind:isOpen destroyChildrenOnClose={true}>
  <div class="p-3">
    <!-- Header -->
    <h1 class="text-lg font-semibold">
      Meal {uuid}
    </h1>
    <div class="divider"></div>

    <div class="flex flex-col items-center">
      {#if imageURL}
        <img
          src={imageURL}
          alt="Meal Recipient"
          class="w-48 h-48 object-cover rounded-lg shadow-lg"
        />
      {:else}
        <div class="flex flex-col items-center gap-5">
          <h1 class="font-semibold">Your meal has not been distributed yet.</h1>
          <RandomFoodIcon size={50} />
        </div>
      {/if}
    </div>
  </div>
</ModalPopupMobile>
