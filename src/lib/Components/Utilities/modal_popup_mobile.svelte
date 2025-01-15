<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet/index";
  import type { Snippet } from "svelte";

  type ModalProps = {
    isOpen: boolean;
    title?: string;
    onOpen?: () => void;
    onClose?: () => void;
    header?: Snippet;
    children?: Snippet;
    footer?: Snippet;
    destroyChildrenOnClose?: boolean;
  };

  let {
    isOpen = $bindable(),
    onOpen,
    onClose,
    title,
    header,
    children,
    footer,
    //By default the modal and its children are never removed from the DOM.
    destroyChildrenOnClose = false,
  }: ModalProps = $props();

  function onOpenChange(isOpen: boolean) {
    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }
</script>

<Sheet.Root bind:open={isOpen} {onOpenChange}>
  <Sheet.Content side="bottom" class="h-[85vh] overflow-y-scroll">
    <Sheet.Header class="text-left">
      {#if title}
      <Sheet.Title>{title}</Sheet.Title>
      {/if}
      {@render header?.()}
      <Sheet.Description>
        {#if !destroyChildrenOnClose || isOpen}
          {@render children?.()}
        {/if}
      </Sheet.Description>
    </Sheet.Header>
    <Sheet.Footer>
      {@render footer?.()}
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>

<!-- <script lang="ts">
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
     
      {#if !destroyChildrenOnClose || isOpen}
        {@render children()}
      {/if}
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog> -->
