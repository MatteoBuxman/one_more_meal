<script lang="ts">
  import { Check, CircleX, Clock } from "lucide-svelte";
  import ModalPopupMobile from "../../Utilities/modal_popup_mobile.svelte";
  import type { MealRecipient } from "$lib/types/meals";
  import { getContext } from "svelte";
  import type { Order } from "$lib/types/orders";
  import { clampString } from "$lib/Logic/clamp_string";

  // Import ShadCN/Svelte Badge component
  import { Badge } from "$lib/components/ui/badge/index";

  let isOpen = $state(false);

  let order = getContext("order") as Order;

  let {
    mealRecipient,
    orderStatus,
  }: { mealRecipient: MealRecipient; orderStatus: string } = $props();
</script>

<button onclick={() => (isOpen = true)}>
  {#if orderStatus === "cancelled"}
    <li>
      <Badge
        variant="destructive"
        class="flex items-center gap-2 text-sm justify-self-end"
      >
        <CircleX size={16} class="text-white" />
        <span>{clampString(mealRecipient.id, 20)}</span>
      </Badge>
    </li>
  {:else if orderStatus === "completed" || mealRecipient.delivered}
    <li>
      <Badge
        variant="default"
        class="flex items-center gap-2 text-sm justify-self-end"
      >
        <Check size={16} />
        <span>{clampString(mealRecipient.id, 20)}</span>
      </Badge>
    </li>
  {:else}
    <li class="w-full">
      <Badge
        variant="outline"
        class="flex items-center gap-2 text-sm justify-self-end"
      >
        <Clock size={16} />
        <span>{clampString(mealRecipient.id, 20)}</span>
      </Badge>
    </li>
  {/if}
</button>

<ModalPopupMobile bind:isOpen title={"Meal Information"}>
  {#snippet header()}
    <div class="mb-3 flex flex-col">
      <h2>Meal #<span class="font-mono text-sm">{mealRecipient.id}</span></h2>
    </div>
    <div class="mb-5">
      {#if mealRecipient.delivered}
        <Badge variant="default">Delivered</Badge>
      {:else if orderStatus === "cancelled"}
        <Badge variant="destructive">Cancelled</Badge>
      {:else}
      <Badge variant="outline">Pending</Badge>
      {/if}
    </div>
  {/snippet}

  <div class="mt-3">
    {#if mealRecipient.delivered}
      <div class="mb-5">
        <h1 class="text-lg text-black">Recieved by <span class="font-bold">{mealRecipient.recipientName}</span></h1>
      </div>
      <img class="rounded-sm" src={mealRecipient.acceptanceImgURL} alt="Recipient's meal acceptance" />
    {:else if orderStatus === "cancelled"}
      <h1>Your order was cancelled</h1>
    {:else}
    <h1>Your meal has not been distributed yet.</h1>
    {/if}
  </div>
  
</ModalPopupMobile>
