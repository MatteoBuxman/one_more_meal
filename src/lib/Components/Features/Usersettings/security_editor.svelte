<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import CardContent from "$lib/components/ui/card/card-content.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import TabsContent from "$lib/components/ui/tabs/tabs-content.svelte";
</script>

<!-- Security Settings -->
<TabsContent value="security">
  <CardContent class="space-y-6">
    <div class="space-y-4">
      <div class="space-y-2">
        <Label for="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          value="12345678910"
          type="password"
          disabled
        />
      </div>

      <div class="space-y-2">
        <Label for="newPassword">New Password</Label>
        <Input id="newPassword" type="password" />
      </div>

      <div class="space-y-2">
        <Label for="confirmPassword">Confirm New Password</Label>
        <Input id="confirmPassword" type="password" />
      </div>
    </div>
    <Button>Update password</Button>
  </CardContent>
</TabsContent>
