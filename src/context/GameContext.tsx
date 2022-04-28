import React, { createContext, useEffect, useState } from 'react'
import { IGrid, IPosition, ISettings } from '../types';
import { generateGrid } from '../helpers/generate';
import { useInterval } from '../helpers/interval';

interface GameContextType {
  settings: ISettings;
  grid: IGrid | null;
  remainingBlocks: number | null;
  currentTime: number | null;
  [key: string]: any;
}

export const GameContext = createContext<GameContextType>({
  settings: { blocks: 16, bombs: 32 },
  grid: null,
  remainingBlocks: null,
  currentTime: 0
})

export const GameProvider = ({ children }: any) => {
  const [settings, setSettings] = useState({ blocks: 16, bombs: 32 })
  const [grid, setGrid] = useState<IGrid | null>(null)
  const [gameActive, setGameActive] = useState(false)
  const [gameOver, setGameOver] = useState<{ won: boolean } | null>(null)
  const [remainingBlocks, setRemainingBlocks] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState<number>(0)

  const onStartGame = () => {
    setGrid(generateGrid(settings))
    setGameOver(null)
    setGameActive(false)
    setCurrentTime(0)
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

  useInterval(() => {
    setCurrentTime(currentTime + 1000)
  }, (gameActive && !gameOver) ? 1000 : null)

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
        setRemainingBlocks,
        currentTime,
        setCurrentTime,
        setGameActive
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
