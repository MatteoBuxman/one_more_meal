<script lang="ts">
  import CardContent from "$lib/components/ui/card/card-content.svelte";
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import TabsContent from "$lib/components/ui/tabs/tabs-content.svelte";

</script>

<!-- Notifications Settings -->
<TabsContent value="notifications">
    <CardContent class="space-y-6">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <h4 class="font-medium">Email Notifications</h4>
            <p class="text-sm text-muted-foreground">
              Receive email updates about your account activity
            </p>
          </div>
          <Switch />
        </div>

        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <h4 class="font-medium">Marketing Communications</h4>
            <p class="text-sm text-muted-foreground">
              Receive marketing communications and promotions
            </p>
          </div>
          <Switch />
        </div>
      </div>
    </CardContent>
</TabsContent>