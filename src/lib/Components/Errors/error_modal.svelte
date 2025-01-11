<script lang="ts">
  import { X } from "lucide-svelte";

  let modal: HTMLDialogElement;
  let { error_message, isOpen = $bindable(true) }: { error_message: string, isOpen?: boolean } = $props();

  $effect(()=>{
    if(isOpen){
        modal.showModal();
    }
  })
</script>

<dialog id="modal_id" class="modal" bind:this={modal} onclose={() => isOpen = false}>
    <div class="modal-box border shadow-lg shadow-red-300 flex flex-col gap-3 p-4">
        <form method="dialog" class="ml-auto">
            <button><X/></button>
        </form>
        <h1 class="font-bold">There was an error completing your request.</h1>
        <p class="text-gray-500 text-sm">{error_message}.</p>
        <p class="text-gray-500 text-sm">Please check your internet connection or retry in a while.</p>
    </div>
    <form class="modal-backdrop" method="dialog">
        <button>exit</button>
    </form>
</dialog>
