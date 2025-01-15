<script lang="ts">
  import ModalPopupMobile from "$lib/components/Utilities/modal_popup_mobile.svelte";
  import ScanQrcode from "$lib/components/Features/NewOrder/scan_qr code.svelte";

  let {
    firstID,
    quantity,
    onComplete,
    isOpen = $bindable(),
  }: {
    firstID: string;
    quantity: number;
    onComplete: (IDs: Array<string>) => void;
    isOpen: boolean;
  } = $props();
  let position = $state(0);

  let additionalIDs = $state<Array<string>>([]);

  let scanError = $state(false);

  function scanSuccess(uuid: string) {
    //Validate the code has not been scanned already
    if (additionalIDs.includes(uuid) || firstID === uuid) {
      scanError = true;
      return true;
    }

    position += 1;
    additionalIDs.push(uuid);
    scanError = false;

    //Close upon completion
    if (position === quantity - 1) {
      onComplete(additionalIDs);
      isOpen = false;
      return false;
    }

    return true;
  }

  function resetState() {
    position = 0;
    additionalIDs = [];
    scanError = false;
  }
</script>

<ModalPopupMobile
  bind:isOpen
  destroyChildrenOnClose={true}
  onClose={resetState}
>
  <div class="p-3 flex flex-col">
    <h2 class="text-sm font-bold text-black">Extra meal {position + 1} of {quantity - 1}.</h2>
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
