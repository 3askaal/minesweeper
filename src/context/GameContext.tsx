import React, { createContext, useEffect, useState } from 'react'
import { useSocket } from "use-socketio";
import { useHistory } from 'react-router-dom'
import { useInterval } from '../helpers/interval';
import { Socket } from 'socket.io-client';
import { IBomb, IExplosion, IGrid, IPlayer, ISettings } from '../types';
import { generateGrid } from '../helpers/generate';

interface GameContextType {
  socket?: Socket;

  blocks?: number;
  grid?: IGrid;
  bombs?: IBomb;
  explosions?: IExplosion;
  settings: ISettings;
  remainingTime?: number;

  [key: string]: any;
}



export const GameContext = createContext<GameContextType>({
  settings: {},
})

// interface MoveActionPayload {
//   playerIndex: number;
//   direction: 'x' | 'y';
//   movement: number;
// }

// interface BombActionPayload {
//   playerIndex: number;
// }

export const GameProvider = ({ children }: any) => {
  const history = useHistory()
  const { socket } = useSocket()
  const [settings, setSettings] = useState<any>({ type: 'local' })
  const [remainingTime, setRemainingTime] = useState<number>(1000)
  const [blocks] = useState(16)
  const [grid, setGrid] = useState<any>(null)
  const [gameOver, setGameOver] = useState(false)

  const onStartGame = (args?: any) => {
    setGrid(generateGrid(blocks))
    setRemainingTime(remainingTime || 3 * 60 * 1000)
    setGameOver(false)

    // history.push(`/play`)

    // ReactGA4.event({
    //   category: "actions",
    //   action: "game:start",
    //   label: players.map(({ name }: any) => name).join(' vs. '),
    // });
  }

  useInterval(() => {
    setRemainingTime(remainingTime - 1000)
  }, remainingTime ? 1000 : null)

  return (
    <GameContext.Provider
      value={{
        onStartGame,
        settings,
        setSettings,
        remainingTime,
        blocks,
        grid,
        setGrid,
        gameOver,
        setGameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
