<script lang="ts">
  import ModalPopupMobile from "$lib/components/Utilities/modal_popup_mobile.svelte";
  import ScanQrcode from "$lib/components/Features/NewOrder/scan_qr code.svelte";
  import { getContext } from "svelte";
  import type { CurrentOrderState } from "./current_order_provider/current_order_state.svelte";
  import type { Meal } from "$lib/types/meals";

  const currentOrderState = getContext<CurrentOrderState>(
    "current_order_state"
  );

  let {
    meal_data,
    isOpen = $bindable(),
    close,
  }: {
    meal_data: Meal;
    isOpen: boolean;
    close: () => void;
  } = $props();

  let position = $state(0);
  let scanError = $state(false);

  function scanSuccess(uuid: string) {
    //Validate the code has not been scanned already

    try {
      currentOrderState.checkUniqueMealID(uuid);

      if (meal_data.ids.includes(uuid)) {
        throw new OrderAlreadyContainsMealUUIDsError("This meal has already been added to the order.");
      }

    } catch (e) {
      scanError = true;
      return true;
    }

    position += 1;
    meal_data.ids.push(uuid);
    scanError = false;

    //Close upon completion
    if (position === meal_data.quantity - 1) {
      currentOrderState.pushMeal(meal_data);
      isOpen = false;
      close();
      return false;
    }

    return true;
  }

  function resetState() {
    position = 0;
    meal_data.ids = meal_data.ids.slice(0, 1);
    scanError = false;
  }
</script>

<ModalPopupMobile
  bind:isOpen
  destroyChildrenOnClose={true}
  onClose={resetState}
>
  <div class="p-3 flex flex-col">
    <h2 class="text-sm font-bold text-black">
      Extra meal {position + 1} of {meal_data.quantity - 1}.
    </h2>
    <!-- Already been scanned -->
    {#if scanError}
      <div class="text-red-500 text-sm font-bold mt-3">
        This code has already been scanned. Please scan a new meal.
      </div>
    {/if}
    <div>
      <ScanQrcode {scanSuccess} />
    </div>
  </div>
</ModalPopupMobile>
