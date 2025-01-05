<script>
  import ModalPopupMobile from "$lib/Components/modal_popup_mobile.svelte";

  let isOpen = $state(false);
</script>

<button onclick={() => (isOpen = true)}>Open modal</button>

<ModalPopupMobile bind:isOpen>
  <h1>Hello world</h1>
</ModalPopupMobile>
