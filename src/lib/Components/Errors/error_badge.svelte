<script lang="ts">
  import { OctagonAlert } from "lucide-svelte";

  let { error }: { error: Error } = $props();
</script>

<div class="badge badge-error text-white p-2 flex gap-2">
  <OctagonAlert size={16} class="" />
  <p class="text-sm">{error.message}</p>
</div>
