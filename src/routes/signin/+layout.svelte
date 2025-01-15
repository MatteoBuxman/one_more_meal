<script lang="ts">
  import RenderWhenFinishedLoading from "$lib/components/Utilities/render_when_finished_loading.svelte";

    let {children} = $props();
</script>

<RenderWhenFinishedLoading redirectPath="/dashboard">
    {@render children()}
</RenderWhenFinishedLoading>