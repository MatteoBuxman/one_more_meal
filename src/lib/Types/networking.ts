import type { UserAddress } from "./user_settings";

export type FetchUserAddressesResult = {
  defaultAddress: UserAddress;
  addresses: UserAddress[];
}