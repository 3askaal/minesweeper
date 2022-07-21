import React, { createContext, useEffect, useState } from 'react'
import { IGameMode, IGrid, IPosition, ISettings } from '../types';
import { generateGrid } from '../helpers/generate';
import { useInterval } from '../helpers/interval';

interface GameContextType {
  settings: ISettings;
  grid: IGrid | null;
  remainingBlocks: number | null;
  currentTime: number | null;
  [key: string]: any;
}

export const GAME_MODES: {[key: string]: IGameMode} = {
  beginner: { width: 9, height: 9, mines: 10 },
  intermediate: { width: 16, height: 16, mines: 40 },
  expert: { width: 30, height: 16, mines: 99 },
}

export const GameContext = createContext<GameContextType>({
  settings: {
    mode: GAME_MODES.intermediate
  },
  grid: null,
  remainingBlocks: null,
  currentTime: 0
})

export const GameProvider = ({ children }: any) => {
  const [settings, setSettings] = useState({ mode: GAME_MODES.intermediate })
  const [grid, setGrid] = useState<IGrid | null>(null)
  const [gameActive, setGameActive] = useState(false)
  const [gameResult, setGameResult] = useState<{ won: boolean } | null>(null)
  const [remainingBlocks, setRemainingBlocks] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState<number>(0)

  const onStartGame = () => {
    setGrid(generateGrid(settings))
    setGameResult(null)
    setGameActive(false)
    setCurrentTime(0)
  }

  useEffect(() => {
    if (grid) {
      const newRemainingBlocks = Object.values(grid).filter((position: IPosition) => {
        return position.block && !position.mine
      }).length

      setRemainingBlocks(newRemainingBlocks)

      if (!newRemainingBlocks) {
        setGameResult({ won: true })
      }
    }
  }, [grid])

  useInterval(() => {
    setCurrentTime(currentTime + 1000)
  }, (gameActive && !gameResult) ? 1000 : null)

  return (
    <GameContext.Provider
      value={{
        onStartGame,
        settings,
        setSettings,
        grid,
        setGrid,
        gameResult,
        setGameResult,
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
