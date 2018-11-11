import {Employee} from '../employee/employee.model';

export interface Freight {
  freightId: number;
  employee: Employee;
  broker: string;
  date: Date;
  commodity: string;
  rate: number;
  weight: number;
  pallets: number;
  kind: string; /*dry | frozen etc.*/
  description: string;
}
