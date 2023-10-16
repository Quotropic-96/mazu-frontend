import { Whale } from './Whale'

export type Map = {
  _id: string;
  url: string;
  whaleId: Whale;
  startMonth: number;
  endMonth: number;
};
