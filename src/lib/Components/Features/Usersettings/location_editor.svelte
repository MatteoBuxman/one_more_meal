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
  import { MapPin, Plus, Trash2 } from "lucide-svelte";
  import { firestore, useAuthStore } from "$lib/firebase/firebase_init";
  import { fetchUserAddresses } from "$lib/firebase/firestore/fetch_data";
  import LoadingBar from "$lib/components/Utilities/loading_bar.svelte";
  import * as RadioGroup from "$lib/components/ui/radio-group/index";
  import { get } from "svelte/store";
  import { addDoc, collection, doc, writeBatch } from "firebase/firestore";
  import { onMount } from "svelte";
  import type { UserLocation } from "$lib/types/location";
  import type { SearchBoxRetrieveResponse } from "@mapbox/search-js-core";
  import MapboxSearchAutocomplete from "./mapbox_search_autocomplete.svelte";

  

  const auth = useAuthStore();

  onMount(() => {
    fetchAddresses();
  });

  let addresses: UserLocation[] | null = $state(null);
  let selected_location: SearchBoxRetrieveResponse | null = $state(null);
  let postal_code: string | null = $state(null);
  let address_name : string = $state("");
  let phone_number : string = $state("");
  let open = $state(false);

  $effect(() => {
    if (selected_location) {
      postal_code =
        selected_location.features[0].properties.context.postcode?.name ?? null;
    }
  });

  async function fetchAddresses() {
    addresses = await fetchUserAddresses(firestore, get(auth)?.user?.uid ?? "");
  }

  function handleAddressChange(address_id: string) {
    const collectionRef = collection(
      firestore,
      "Users",
      get(auth).user?.uid || "",
      "addresses"
    );

    const newDefaultRef = doc(collectionRef, address_id);

    const oldDocDefaultID = (addresses as UserLocation[]).find(
      (address) => address.isDefault
    )?.address_id;

    const oldDefaultRef = doc(collectionRef, oldDocDefaultID);

    const batch = writeBatch(firestore);

    batch.update(newDefaultRef, { isDefault: true });
    batch.update(oldDefaultRef, { isDefault: false });
    batch.commit();

    //Adjust the addresses array to reflect the new default address.
    addresses = (addresses as UserLocation[]).map((address) => {
      if (address.address_id === address_id) {
        return { ...address, isDefault: true };
      } else {
        return { ...address, isDefault: false };
      }
    });
  }

  function handleSubmit(e: Event){
    e.preventDefault();
    if(!selected_location) return;

    const collectionRef = collection(
      firestore,
      "Users",
      get(auth).user?.uid || "",
      "addresses"
    );

    const newAddress = {
      name: address_name,
      phone_number: phone_number,
      street: selected_location.features[0].properties.context.address?.name ?? "",
      suburb: selected_location.features[0].properties.context.neighborhood?.name ?? "",
      city: "Cape Town",
      province: "Western Cape",
      postal_code: postal_code,
      isDefault: addresses?.length === 0 ? true : false,
      mapbox_id: selected_location.features[0].properties.mapbox_id,
      full_address: selected_location.features[0].properties.full_address,
    };

    addDoc(collectionRef, newAddress).then(() => {
      fetchAddresses();
    });

    open = false;
  }
</script>

{#if !$auth.user || !addresses}
  <div class="m-3">
    <LoadingBar />
  </div>
{:else}
  <!-- General Settings -->
  <TabsContent value="addresses">
    <CardContent class="space-y-6">
      <div class="space-y-6">
        <!-- Add New Address -->
        <Dialog bind:open>
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
            <form class="space-y-4 py-4" onsubmit={handleSubmit}>
              <div class="space-y-2">
                <Label for="addressTitle">Address Title*</Label>
                <Input id="addressTitle" placeholder="e.g., Home, Office" bind:value={address_name} required />
              </div>

              <div class="space-y-2">
                <Label for="phone">Phone*</Label>
                <Input id="phone" placeholder="eg. +27378399322" bind:value={phone_number} required />
              </div>

              <div class="space-y-2">
                <Label for="address">Street Address*</Label>
                <MapboxSearchAutocomplete bind:selected_location />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="country">Country*</Label>
                  <Input id="country" placeholder="South Africa" value="South Africa" required disabled />
                </div>
                <div class="space-y-2">
                  <Label for="country">Province*</Label>
                  <Input id="province" placeholder="Western Cape" value="Western Cape" required disabled />
                </div>
              </div>

              <div class="space-y-2">
                <Label for="country">City*</Label>
                <Input id="city" placeholder="Cape Town" value="Cape Town" required disabled />
              </div>

              <div class="space-y-2">
                <Label for="zipcode">Postal Code*</Label>
                <Input
                  id="zipcode"
                  placeholder="eg. 7700"
                  bind:value={postal_code}
                  required
                />
              </div>

              <Button class="w-full" type="submit">Add Address</Button>
            </form>
          </DialogContent>
        </Dialog>
        <!-- Address List -->
        <RadioGroup.Root
          onValueChange={handleAddressChange}
          value={(addresses as UserLocation[]).find(
            (address) => address.isDefault
          )?.address_id}
        >
          <div class="grid gap-4">
            {#each addresses as UserLocation[] as address (address.address_id)}
              <Card>
                <CardContent
                  class="p-4 {address.isDefault
                    ? 'border border-solid border-gray-400 rounded'
                    : ''}"
                >
                  <div class="flex items-center justify-end">
                    <RadioGroup.Item value={address.address_id} />
                  </div>
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
                              Default address
                            </span>
                          {/if}
                        </div>
                        <p class="text-sm text-muted-foreground">
                          {address.phone_number}
                        </p>
                        <p class="text-sm text-muted-foreground">
                          {address.street}
                        </p>
                        <p class="text-sm text-muted-foreground">
                          {address.suburb}, {address.city}, {address.postal_code}
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
        </RadioGroup.Root>
      </div>
    </CardContent>
  </TabsContent>
{/if}
