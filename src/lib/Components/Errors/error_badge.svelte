<script lang="ts">
  import { OctagonAlert } from "lucide-svelte";
  import { Badge } from "$lib/components/ui/badge/index";

  let { error }: { error: Error } = $props();
</script>

<div class="flex items-start">
  <Badge class="text-white text-sm font-light flex gap-2 " variant="destructive">
    <OctagonAlert size={16} class="" />
    <p class="text-sm">{error.message}</p>
  </Badge>
</div>
