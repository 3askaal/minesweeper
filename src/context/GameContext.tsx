import React, { createContext, useEffect, useState } from 'react'
import { useSocket } from "use-socketio";
import { useHistory } from 'react-router-dom'
import ReactGA4 from 'react-ga4'
import { useInterval } from '../helpers/interval';
import { generateDamage } from '../helpers/actions';
import { Socket } from 'socket.io-client';
import { IBomb, IExplosion, IGrid, IPlayer, ISettings } from '../types';
import { generateGrid, generatePlayers } from '../helpers/generate';

interface GameContextType {
  socket?: Socket;

  blocks?: number;
  grid?: IGrid;
  bombs?: IBomb;
  explosions?: IExplosion;
  players: IPlayer[];
  settings: ISettings;
  remainingTime?: number;

  getOpponents?: any;
  getCurrentPlayer?: any;

  [key: string]: any;
}



export const GameContext = createContext<GameContextType>({
  settings: {
    type: 'local'
  },
  players: []
})

interface MoveActionPayload {
  playerIndex: number;
  direction: 'x' | 'y';
  movement: number;
}

interface BombActionPayload {
  playerIndex: number;
}

export const GameProvider = ({ children }: any) => {
  const history = useHistory()
  const { socket } = useSocket()
  const [players, setPlayers] = useState<IPlayer[]>([])
  const [settings, setSettings] = useState<any>({ type: 'local' })
  const [remainingTime, setRemainingTime] = useState<number>(1000)
  const [blocks] = useState(16)
  const [grid, setGrid] = useState<any>({})
  const [bombs, setBombs] = useState<any>(null)
  const [explosions, setExplosions] = useState<any>(null)

  const onStartGame = (args?: any) => {
    console.log('onStartGame')
    const { grid: newGrid, players: newPlayers, time: remainingTime } = args || {}
    setGrid(newGrid || generateGrid(blocks))
    setPlayers((currentPlayers) => newPlayers || generatePlayers(currentPlayers, blocks))
    setRemainingTime(remainingTime || 3 * 60 * 1000)

    history.push(`/play`)

    ReactGA4.event({
      category: "actions",
      action: "game:start",
      label: players.map(({ name }: any) => name).join(' vs. '),
    });
  }

  function onGameMove ({ playerIndex, direction, movement }: MoveActionPayload) {
    const newPlayer = { ...players[playerIndex] }

    newPlayer[direction] += movement

    const positionIsOutOfMap = newPlayer[direction] > blocks || newPlayer[direction] < 0

    if (positionIsOutOfMap) {
      return;
    }

    const positionIsReserved = Object.values(grid)
      .find(({ x, y, stone, brick }: any) =>
        (x === newPlayer.x && y === newPlayer.y) &&
        (stone || brick))

    if (positionIsReserved) {
      return
    }

    setPlayers((currentPlayers: any) => currentPlayers.map((player: any, index: number) => ({
      ...player,
      ...index === playerIndex && {
        x: newPlayer.x,
        y: newPlayer.y,
      }
    })))
  }

  function onGameBomb ({ playerIndex }: BombActionPayload) {
    const { damagePositions, newGrid, explosion, resetExplosion, bomb, resetBomb } = generateDamage(grid, players, playerIndex)

    setBombs((currentBombs: any) => ({ ...currentBombs, ...bomb }))

    setTimeout(() => {
      setBombs((currentBombs: any) => ({ ...currentBombs, ...resetBomb }))
      setGrid((currentGrid: any) => ({ ...currentGrid, ...newGrid }))

      setPlayers((currentPlayers: any) => {
        return currentPlayers.map((player: any) => ({
          ...player,
          ...damagePositions.some(({ x, y }) => player.x === x && player.y === y) && ({
            health: player.health - 20
          })
        }))
      })

      setExplosions((currentExplosions: any) => ({ ...currentExplosions, ...explosion }))
    }, 3000)

    setTimeout(() => {
      setExplosions((currentExplosions: any) => ({ ...currentExplosions, ...resetExplosion }))
    }, 3500)
  }

  useInterval(() => {
    setRemainingTime(remainingTime - 1000)
  }, remainingTime ? 1000 : null)


  const getOpponents = (): any[] => players.filter(({ socketId }: any) => socketId !== socket.id)

  const getActivePlayers = (): any[] => {
    return [...(players || [])].sort((a: any, b: any) => b.health - a.health).filter(({ health }: any) => health > 0)
  }

  const gameOver = () => getActivePlayers().length === 1 || !remainingTime

  const getWinner = (): any => {
    return gameOver() ? getActivePlayers()[0] : false
  }

  const getMe = (): any => {
    return players.filter(({ socketId, name }) => socketId === socket.id && name)[0] || null
  }

  return (
    <GameContext.Provider
      value={{
        onStartGame,
        onGameMove,
        onGameBomb,
        players,
        setPlayers,
        settings,
        setSettings,
        remainingTime,
        getOpponents,
        blocks,
        grid,
        setGrid,
        bombs,
        setBombs,
        explosions,
        setExplosions,
        getActivePlayers,
        getMe,
        gameOver,
        getWinner,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
