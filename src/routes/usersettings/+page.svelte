<!-- AccountSettings.svelte -->
<script lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { LogOut } from "lucide-svelte";
  import { useAuthStore } from "$lib/firebase/firebase_init";
  import Settings from "$lib/components/Features/Usersettings/settings.svelte";


  const auth = useAuthStore();

</script>

<div class="p-3">
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex flex-col gap-5 justify-between items-start">
      <div>
        <h1 class="text-2xl font-bold">Account Settings</h1>
        <p class="text-muted-foreground text-sm">
          Manage your account settings and preferences
        </p>
      </div>
      <Button>
        <LogOut class="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Profile Overview Card -->
      <Card class="col-span-12 lg:col-span-4">
        <CardHeader>
          <CardTitle class="text-xl">Profile Overview</CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col  gap-4">
          <div class="">
            <h3 class="font-semibold text-lg">{$auth.user?.displayName}</h3>
            <p class="text-sm text-muted-foreground">{$auth.user?.email}</p>
            <p class="text-sm text-muted-foreground">
              {$auth.user?.phoneNumber}
            </p>
          </div>
        </CardContent>
      </Card>

      <Settings/>
    </div>
  </div>
</div>
