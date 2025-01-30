<script>
  import ErrorBadge from "$lib/components/Errors/error_badge.svelte";
  import ErrorModal from "$lib/components/Errors/error_modal.svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  let error = Error("This is an error message");
  let isOpen = $state(false);
</script>

<Button onclick={()=> isOpen=true}>Open</Button>
<ErrorModal bind:isOpen error_message="This is an error message" />