<script lang="ts">
  import { X } from "lucide-svelte";
  import type { Snippet } from "svelte";

  type ModalProps = {
    isOpen: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    children: Snippet;
    destroyChildrenOnClose?: boolean;
  };

  let {
    isOpen = $bindable(),
    onOpen,
    onClose,
    children,
    //By default the modal and its children are never removed from the DOM.
    destroyChildrenOnClose = false,
  }: ModalProps = $props();

  let modal: HTMLDialogElement;

  function openModal() {
    if (onOpen) {
      onOpen();
    }
    modal.showModal();
  }

  function closeModal() {
    if (onClose) {
      onClose();
    }
    modal.close();
  }

  $effect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  });
</script>

<dialog bind:this={modal} onclose={() => (isOpen = false)} class="modal">
  <div
    class="modal-box absolute bottom-0 w-full top-20 rounded-t-lg rounded-b-none p-0"
  >
    <form method="dialog">
      <div class="flex justify-end">
        <button class="btn btn-sm btn-circle btn-ghost m-3"
          ><X size={24} /></button
        >
      </div>
    </form>
    <div>
     <!-- Logic to implement the destroyChildrenOnClose logic -->
      {#if !destroyChildrenOnClose || isOpen}
        {@render children()}
      {/if}
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
