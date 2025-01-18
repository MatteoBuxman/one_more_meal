<script lang="ts">
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "$lib/components/ui/tabs";
  import {
    Card,
    CardContent,
    CardHeader,
  } from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";
  import { Switch } from "$lib/components/ui/switch";
  
  import { MapPin, Plus,  Bell, CreditCard, Shield } from "lucide-svelte";
  
  import LocationEditor from "./location_editor.svelte";
  import { useAuthStore } from "$lib/Firebase/firebase_init";
  import PaymentsEditor from "./payments_editor.svelte";
  import NotificationsEditor from "./notifications_editor.svelte";
  import SecurityEditor from "./security_editor.svelte";

    const auth = useAuthStore();
</script>


<!-- Settings Tabs -->
<Card class="col-span-12 lg:col-span-4">
    <Tabs value="addresses" class="w-full">
      <CardHeader class="w-full  ">
        <TabsList class="h-16 grid-cols-2 md:grid-cols-4 grid h-34">
          <TabsTrigger
            value="addresses"
            class="flex flex-col items-center gap-2"
          >
            <MapPin class="h-4 w-4" /> Addresses
          </TabsTrigger>
          <TabsTrigger
            value="security"
            class="flex flex-col items-center gap-2"
          >
            <Shield class="h-4 w-4" /> Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            class="flex flex-col items-center gap-2"
          >
            <Bell class="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            class="flex flex-col items-center gap-2"
          >
            <CreditCard class="h-4 w-4" /> Billing
          </TabsTrigger>
        </TabsList>
      </CardHeader>

      <LocationEditor/>

      <SecurityEditor/>

      <NotificationsEditor/>

      <PaymentsEditor/>
    </Tabs>
  </Card>