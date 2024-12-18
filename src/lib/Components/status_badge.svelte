<script lang="ts">
    import type { MealStatus } from "$lib/Types/meals";
    let { status }: { status: MealStatus } = $props();
</script>

{#if status === 'order placed'}
    <span class="badge badge-neutral">Ordered</span>
{:else if status === 'picked up'}
    <span class="badge badge-accent">Picked up</span>
{:else if status === 'completed'}
    <span class="badge badge-success">Completed</span>
{:else}
    <span class="badge badge-error">Cancelled</span>
{/if}