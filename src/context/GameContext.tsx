import React, { createContext, useEffect, useState } from 'react'
import { IGrid, IPosition, ISettings } from '../types';
import { generateGrid } from '../helpers/generate';

interface GameContextType {
  blocks?: number;
  grid: IGrid | null;
  remainingBlocks: number | null;
  settings: ISettings;
  [key: string]: any;
}

export const GameContext = createContext<GameContextType>({
  settings: { blocks: 16, bombs: 32 },
  grid: null,
  remainingBlocks: null
})

export const GameProvider = ({ children }: any) => {
  const [settings, setSettings] = useState({ blocks: 16, bombs: 32 })
  const [grid, setGrid] = useState<IGrid | null>(null)
  const [gameOver, setGameOver] = useState<{ won: boolean } | null>(null)
  const [remainingBlocks, setRemainingBlocks] = useState<number | null>(null)

  const onStartGame = () => {
    setGrid(generateGrid(settings))
    setGameOver(null)
  }

  useEffect(() => {
    if (grid) {
      const newRemainingBlocks = Object.values(grid).filter((position: IPosition) => {
        return position.block && !position.bomb
      }).length

      setRemainingBlocks(newRemainingBlocks)

      if (!newRemainingBlocks) {
        setGameOver({ won: true })
      }
    }
  }, [grid])

  return (
    <GameContext.Provider
      value={{
        onStartGame,
        settings,
        setSettings,
        grid,
        setGrid,
        gameOver,
        setGameOver,
        remainingBlocks,
        setRemainingBlocks
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
