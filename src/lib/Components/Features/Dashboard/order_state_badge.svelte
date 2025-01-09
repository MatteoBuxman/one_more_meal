<script lang="ts">
  import { Check, CircleX, Clock } from "lucide-svelte";


    type Statuses = 'ordered' | 'picked_up' | 'completed' | 'cancelled';

    let { status } : {status : Statuses} = $props();

    function getText(){
        switch(status){
            case "ordered":
                return 'Ordered';
            case 'picked_up':
                return 'Picked Up';
            case 'completed':
                return 'Completed';
            case 'cancelled':
                return 'Cancelled';
        }
    }

    function getStyle(){
        switch(status){
            case 'ordered':
                return 'bg-yellow-500';
            case 'picked_up':
                return 'bg-blue-500';
            case 'completed':
                return 'bg-green-500';
            case 'cancelled':
                return 'bg-red-500';
        }
    }
</script>

<div class="flex gap-2 badge text-white p-3 {getStyle()}">
        {#if status === 'ordered'}
            <Clock size={20} />
        {:else if status === 'picked_up'}
            <Clock size={20} />
        {:else if status === 'completed'}
            <Check size={20} />
        {:else}
            <CircleX size={20} />
        {/if}
    <span class="text-xs font-bold">{getText()}</span>
</div>
