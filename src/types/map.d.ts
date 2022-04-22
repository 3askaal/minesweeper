
export interface IPosition {
  x: number;
  y: number;
  block: boolean;
  bomb?: boolean;
  marker?: boolean;
  amount?: number;
  flag?: boolean;
}
export interface IGrid {
  [posKey: string]: IPosition
}
