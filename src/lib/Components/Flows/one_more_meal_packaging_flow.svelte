<script lang="ts">
  import MealAddingSelector from "../meal_adding_selector.svelte";
  import ScanQrcode from "../scan_qr code.svelte";

  let modalOpen : boolean = $state(false);
  let scannedMeals : string[] = $state([]);

  //Modal open
  function handleClick() {
    modalOpen = true;
    (document.getElementById('qr_modal') as HTMLDialogElement
  ).showModal();
  }

  //Modal close
  function scanSuccess(scanData: string){
    scannedMeals.push(scanData);
    modalOpen = false;
    (document.getElementById('qr_modal') as HTMLDialogElement
  ).close();
  }
</script>

<div class="font-lexend p-3">
  <div class="flex flex-col gap-2">
    <h2 class="font-light text-sm">
      Please scan the QR code on the side of each meal.
    </h2>
    <button class="btn btn-primary" onclick={handleClick}>Open scanner</button>
  </div>
  <MealAddingSelector/>
</div>

{#each scannedMeals as meal}
    <h1>{meal}</h1>
{/each}

<dialog id="qr_modal" class="modal relative font-lexend">
  <div
    class="modal-box absolute w-full bottom-0 top-20 rounded-t-lg rounded-b-none"
  >
    <button
      aria-label="Close modal"
      onclick={() =>
        (
          document.getElementById('qr_modal') as HTMLDialogElement
        ).close()}
      ><svg
        class="ml-auto size-6 mb-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg></button
    >

    <div class="flex gap-4 w-full items-center p-4">
        {#if modalOpen}
            <ScanQrcode {scanSuccess}/>
        {/if}
    </div>
  </div>
</dialog>
