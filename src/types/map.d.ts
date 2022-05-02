
export interface IPosition {
  x: number;
  y: number;
  block: boolean;
  mine?: boolean;
  thread?: boolean;
  amount?: number;
  flag?: boolean;
}
export interface IGrid {
  [posKey: string]: IPosition
}
