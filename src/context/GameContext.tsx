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
  settings: {},
  grid: null,
  remainingBlocks: null
})

export const GameProvider = ({ children }: any) => {
  const [settings, setSettings] = useState({ type: 'local' })
  const [blocks] = useState(16)
  const [grid, setGrid] = useState<IGrid | null>(null)
  const [gameOver, setGameOver] = useState<{ won: boolean } | null>(null)
  const [remainingBlocks, setRemainingBlocks] = useState<number | null>(null)

  const onStartGame = () => {
    setGrid(generateGrid(blocks))
    setGameOver(null)
  }

  useEffect(() => {
    if (grid) {
      const newRemainingBlocks = Object.values(grid).filter((position: IPosition) => {
        return position.block && !position.bomb
      }).length

      setRemainingBlocks(newRemainingBlocks)

      if (!remainingBlocks) {
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
        blocks,
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
