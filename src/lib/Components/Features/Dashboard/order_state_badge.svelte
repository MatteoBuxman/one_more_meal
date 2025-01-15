<script lang="ts">
  import Badge from "$lib/components/ui/badge/badge.svelte";

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

    function getVariant(){
        switch(status){
            case "ordered":
                return 'secondary';
            case 'picked_up':
                return 'outline';
            case 'completed':
                return 'default';
            case 'cancelled':
                return 'destructive';
        }
    }

    
    
</script>

<Badge variant={getVariant()}>{getText()}</Badge>
