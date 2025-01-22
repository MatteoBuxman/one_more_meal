import type { UserLocation } from "$lib/types/location"; 

//Idea is that whichever location is the first element in the array will be the one that is currently selected.
export class LocationDropdownSelectorState {

  private _locations = $state<UserLocation[]>([]);

  constructor(locations: UserLocation[], onStateChange?: () => void) {
    this._locations = locations;
  }

  public newSelection(index: number) {
    if (index >= this._locations.length) return;

    //Carry out the swap
    const temp = this._locations[index];
    this._locations[index] = this._locations[0];
    this._locations[0] = temp;

    
  }

  public getSelectedLocation(): UserLocation {
    return this._locations[0];
  }

  public getLocations(): UserLocation[] {
    const remainder = this._locations.slice(1);
    return remainder;
  }
}

export function useLocationDropdownSelectorState(locations: UserLocation[]) {
  return new LocationDropdownSelectorState(locations);
}
