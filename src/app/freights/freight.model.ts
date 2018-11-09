export interface Freight {
  freightId: number;
  date: Date;
  commodity: string;
  rate: number;
  weight: number;
  pallets: number;
  kind: string; /*dry | frozen etc.*/
  description: string;
}
