import React, { createContext, useContext } from 'react'
import { useSocket } from "use-socketio";
import { Socket } from 'socket.io-client';
import { GameContext } from '.';
import { IPlayer } from '../types';

interface GameContextType {
  socket?: Socket;
  [key: string]: any;
}

export const SocketContext = createContext<GameContextType>({})

export const SocketProvider = ({ children }: any) => {
  const { socket } = useSocket()
  const {
    setPlayers,
    onStartGame,
    onGameBomb,
    onGameMove,
  } = useContext(GameContext)

  useSocket('room:update', ({ players }) => {
    setPlayers(players.map((player: IPlayer) => ({
      ...player,
      me: player.socketId === socket.id
    })))
  })

  useSocket('game:start', (args) => {
    onStartGame(args)
  })

  useSocket('game:bomb', (args) => {
    onGameBomb(args)
  })

  useSocket('game:move', (args) => {
    onGameMove(args)
  })

  const createRoom = (roomId: string) => socket.emit('room:create', { roomId })
  const joinRoom = (roomId: string) => socket.emit('room:join', { roomId })
  const leaveRoom = (roomId: string) => socket.emit('room:leave', { roomId })
  const startGame = () => socket.emit('start', {})
  const bomb = (args: any) => socket.emit('bomb', args)
  const move = (args: any) => socket.emit('move', args)

  return (
    <SocketContext.Provider
      value={{
        socket,
        joinRoom,
        leaveRoom,
        createRoom,
        startGame,
        bomb,
        move,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
