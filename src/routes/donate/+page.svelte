<script lang="ts">
  import ErrorModal from "$lib/Components/Errors/error_modal.svelte";
 import OrderStateBadge from "$lib/Components/Features/Dashboard/order_state_badge.svelte";

 let isOpen = $state(false);
</script>

<button onclick={()=> isOpen = true}>open</button>
<ErrorModal error_message="User not found" bind:isOpen/>


