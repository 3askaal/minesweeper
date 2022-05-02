export interface IGameMode {
  width: number;
  height: number;
  mines: number;
}

export interface ISettings {
  mode: IGameMode;
}
