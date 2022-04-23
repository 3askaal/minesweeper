import React, { createContext, useState } from 'react'
import { IGrid, ISettings } from '../types';
import { generateGrid } from '../helpers/generate';

interface GameContextType {
  blocks?: number;
  grid: IGrid | null;
  settings: ISettings;
  [key: string]: any;
}

export const GameContext = createContext<GameContextType>({
  settings: {},
  grid: null,
})

export const GameProvider = ({ children }: any) => {
  const [settings, setSettings] = useState({ type: 'local' })
  const [blocks] = useState(16)
  const [grid, setGrid] = useState(null)
  const [gameOver, setGameOver] = useState(null)

  const onStartGame = () => {
    setGrid(generateGrid(blocks))
    setGameOver(null)
  }

  return (
    <GameContext.Provider
      value={{
        onStartGame,
        settings,
        setSettings,
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
