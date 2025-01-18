<script lang="ts">
  import { TabsContent } from "$lib/components/ui/tabs";
  import { Card, CardContent } from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";

  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "$lib/components/ui/dialog/index";
  import { MapPin, Plus, Pencil, Trash2 } from "lucide-svelte";
  import { firestore, useAuthStore } from "$lib/Firebase/firebase_init";
  import { fetchUserAddresses } from "$lib/Firebase/Firestore/fetch_data";
  import LoadingBar from "$lib/components/Utilities/loading_bar.svelte";

  const auth = useAuthStore();
</script>



{#if $auth.user}
  {#await fetchUserAddresses(firestore, $auth.user.uid)}
    <div class="m-3">
      <LoadingBar />
    </div>
  {:then savedAddresses}
    <!-- General Settings -->
    <TabsContent value="addresses">
      <CardContent class="space-y-6">
        <div class="space-y-6">
          <!-- Add New Address -->
          <Dialog>
            <DialogTrigger class="w-full">
              <Button class="w-full">
                <Plus class="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent class="max-w-md rounded">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogDescription>
                  Add a new delivery address to your account
                </DialogDescription>
              </DialogHeader>
              <div class="space-y-4 py-4">
                <div class="space-y-2">
                  <Label for="addressTitle">Address Title*</Label>
                  <Input id="addressTitle" placeholder="e.g., Home, Office" />
                </div>

                <div class="space-y-2">
                  <Label for="phone">Phone*</Label>
                  <Input id="phone" placeholder="eg. +27378399322" />
                </div>

                <div class="space-y-2">
                  <Label for="address">Street Address*</Label>
                  <Input id="address" placeholder="eg. 123 Main Street" />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <Label for="country">Country*</Label>
                    <Input id="country" placeholder="South Africa" disabled />
                  </div>
                  <div class="space-y-2">
                    <Label for="country">Province*</Label>
                    <Input id="country" placeholder="Western Cape" disabled />
                  </div>
                </div>

                <div class="space-y-2">
                  <Label for="country">Province*</Label>
                  <Input id="country" placeholder="Cape Town" disabled />
                </div>

                <div class="space-y-2">
                  <Label for="zipcode">Postal Code*</Label>
                  <Input id="zipcode" placeholder="eg. 7700" />
                </div>

                <Button class="w-full">Add Address</Button>
              </div>
            </DialogContent>
          </Dialog>
          <!-- Address List -->
          <div class="grid gap-4">
            {#each savedAddresses as address (address.addressId)}
              <Card>
                <CardContent class="p-4">
                  <div class="flex flex-col gap-4">
                    <div class="flex gap-4">
                      <div
                        class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"
                      >
                        <MapPin class="h-5 w-5 text-primary" />
                      </div>
                      <div class="space-y-1">
                        <div class="flex items-center gap-2">
                          <h3 class="font-medium">{address.name}</h3>
                          {#if address.isDefault}
                            <span
                              class="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                            >
                              Default
                            </span>
                          {/if}
                        </div>
                        <p class="text-sm text-muted-foreground">
                          {address.phoneNumber}
                        </p>
                        <p class="text-sm text-muted-foreground">
                          {address.street}
                        </p>
                        <p class="text-sm text-muted-foreground">
                          {address.suburb}, {address.city}, {address.postalCode}
                        </p>
                      </div>
                    </div>
                    <div class="flex gap-2 ml-auto">
                      <Button variant="outline" size="icon">
                        <Trash2 class="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            {/each}
          </div>
        </div>
      </CardContent>
    </TabsContent>
  {/await}
{/if}
