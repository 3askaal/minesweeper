export interface IGrid {
  [posKey: string]: {
    x: number;
    y: number;
    block: boolean;
    bomb?: boolean;
    marker?: boolean;
    amount?: number;
  }
}
