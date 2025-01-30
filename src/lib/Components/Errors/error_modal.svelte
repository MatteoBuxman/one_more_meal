<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet/index";

  let {
    error_message,
    isOpen = $bindable(true),
  }: { error_message: string; isOpen?: boolean } = $props();
</script>

<Sheet.Root bind:open={isOpen}>
  <Sheet.Content side="top" class="shadow-lg shadow-red-500">
    <Sheet.Header>
      <Sheet.Title class="text-sm text-left"
        >We encountered an error.</Sheet.Title
      >
    </Sheet.Header>
    <Sheet.Description class="mt-4">
      {error_message}
    </Sheet.Description>
  </Sheet.Content>
</Sheet.Root>
