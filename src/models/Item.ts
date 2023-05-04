export interface IItem {
  id: string;
  name: string;
  basePrice?: number;
  avg24hPrice?: number;
  low24hPrice?: number;
  lastLowPrice?: number;
  notifyLowPrice?: number;
}

export interface IItemRes {
  items: IItem[];
}
