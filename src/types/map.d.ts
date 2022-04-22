export interface IGrid {
  [posKey: string]: {
    x: number;
    y: number;
    block: boolean;
    bomb: boolean;
    explosion: boolean;
  }
}
