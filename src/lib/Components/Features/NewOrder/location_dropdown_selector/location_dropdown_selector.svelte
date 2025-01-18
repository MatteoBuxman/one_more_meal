<script lang="ts">
  import Card from "$lib/components/ui/card/card.svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index";
  import type { UserAddress } from "$lib/Types/user_settings";
  import { ChevronDown, MapPin } from "lucide-svelte";
  import { useLocationDropdownSelectorState } from "./location_dropdown_selector_state.svelte";

  let { addresses }: { addresses: UserAddress[] } = $props();

  const state = useLocationDropdownSelectorState(addresses);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class="w-full mb-">
    <Card class=" p-4 shadow-lg">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"
          >
            <MapPin class="h-5 w-5 text-blue-600" />
          </div>
          <div class="text-left">
            <h3 class="font-medium text-sm">
              {state.getSelectedLocation().street}
            </h3>
            <h3 class="font-medium text-sm">
              {state.getSelectedLocation().suburb +
                ", " +
                state.getSelectedLocation().province +
                ", " +
                state.getSelectedLocation().postalCode}
            </h3>
          </div>
        </div>
        <ChevronDown class="h-5 w-5 text-muted-foreground" />
      </div>
    </Card>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-[375px]">
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>Saved Locations</DropdownMenu.GroupHeading>
      <DropdownMenu.Separator />
      {#each state.getLocations() as address, i (address.addressId)}
        <DropdownMenu.Item onclick={() => state.newSelection(i + 1)}>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"
              >
                <MapPin class="h-5 w-5 text-blue-600" />
              </div>
              <div class="text-left">
                <h3 class="font-medium text-sm">
                  {address.street}
                </h3>
                <h3 class="font-medium text-sm">
                  {address.suburb +
                    ", " +
                    address.province +
                    ", " +
                    address.postalCode}
                </h3>
              </div>
            </div>
          </div>
        </DropdownMenu.Item>
      {/each}
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
