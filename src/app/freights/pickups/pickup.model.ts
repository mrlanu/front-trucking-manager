import {Address} from '../../shared/address.model';

export interface PickUp {
  pickupId: number;
  kind: string; // pick-up | delivery
  address: Address;
  date: Date;
  time: string;
  description: string;
  status: string; // scheduled | unscheduled | complete
  location: string; // Addison | Renton | Portland etc.
  trailer: number;
}
