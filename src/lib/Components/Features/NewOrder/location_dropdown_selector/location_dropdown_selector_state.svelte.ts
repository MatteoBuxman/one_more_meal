import type { UserAddress } from "$lib/Types/user_settings";

//Idea is that whichever location is the first element in the array will be the one that is currently selected.
export class LocationDropdownSelectorState {

  private _locations = $state<UserAddress[]>([]);

  constructor(locations: UserAddress[], onStateChange?: () => void) {
    this._locations = locations;
  }

  public newSelection(index: number) {
    if (index >= this._locations.length) return;

    //Carry out the swap
    const temp = this._locations[index];
    this._locations[index] = this._locations[0];
    this._locations[0] = temp;

    
  }

  public getSelectedLocation(): UserAddress {
    return this._locations[0];
  }

  public getLocations(): UserAddress[] {
    const remainder = this._locations.slice(1);
    return remainder;
  }
}

export function useLocationDropdownSelectorState(locations: UserAddress[]) {
  return new LocationDropdownSelectorState(locations);
}
