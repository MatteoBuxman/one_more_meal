<script lang="ts">
  import { PUBLIC_PRODUCTION } from "$lib/Logic/production_state";
  import { Check, Download, LoaderPinwheel } from "lucide-svelte";

  let quantity: number = $state(1);
  let error: boolean = $state(false);
  let isGenerating: boolean = $state(false);
  let success: boolean = $state(false);

  async function handleDownload() {
    if (quantity > 8) {
      error = true;
      return;
    } else if (success) {
      return;
    }

    isGenerating = true;
    error = false;

    try {
      const a = document.createElement("a");
      const apiEndpoint = PUBLIC_PRODUCTION ? "https://onemoremeal.co.za" : "https://867b-102-132-162-197.ngrok-free.app";
      a.href = `${apiEndpoint}/api/generatecodes?amount=${quantity}`;
      a.target = "_blank";
      a.click();

      success = true;
    } catch (e) {
      console.error(e);
      error = true;
    } finally {
      isGenerating = false;
    }
  }
</script>

<div class="flex flex-col justify-center items-center gap-5">
  <div class="flex flex-col gap-3 p-3">
    <h1 class="font-bold text-lg">How many meals are you donating today?</h1>
    <p class="text-sm text-gray-500">
      We will download a PDF with your requested QR codes. Please print it, cut
      each QR code out, and securely stick one to each of your meal containers.
    </p>
  </div>

  <div class="font-semibold p-3">
    <h2 class="inline">I am donating {quantity} meals.</h2>
  </div>

  <div class="w-[90%] p-3">
    <input
      type="range"
      min="1"
      max="6"
      bind:value={quantity}
      class="range"
      step="1"
    />
    <div class="flex w-full justify-between px-2 text-xs">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
    </div>
  </div>

  <button
    class="btn {success
      ? 'btn-success'
      : 'btn-primary'} flex items-center gap-2"
    onclick={handleDownload}
    disabled={isGenerating}
  >
    {#if isGenerating}
      <LoaderPinwheel class="animate-spin" />
      Generating...
    {:else if success}
      <Check />
      Successfully Downloaded
    {:else if !isGenerating}
      <Download />
      Download QR Codes
    {/if}
  </button>

  {#if error}
    <p class="text-red-500 text-sm">
      There was an error generating your codes.
    </p>
  {/if}
</div>
