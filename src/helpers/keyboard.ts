import React, { useContext } from "react"
import useMousetrap from "react-hook-mousetrap"
import { GameContext, SocketContext } from "../context"

export function useKeyboardBindings() {
  const { settings, getMe, onGameMove, onGameBomb } = useContext(GameContext)
  const { move, bomb } = useContext(SocketContext)
  const isLocalGame = settings?.type === 'local'

  const actions = {
    move: isLocalGame ? onGameMove : move,
    bomb: isLocalGame ? onGameBomb : bomb,
  }

  useMousetrap('up', () => actions.move({
    playerIndex: settings.type === 'online' ? getMe()?.index : 1,
    direction: 'y',
    movement: -1
  }))

  useMousetrap('down', () => actions.move({
    playerIndex: settings.type === 'online' ? getMe()?.index : 1,
    direction: 'y',
    movement: 1
  }))

  useMousetrap('left', () => actions.move({
    playerIndex: settings.type === 'online' ? getMe()?.index : 1,
    direction: 'x',
    movement: -1
  }))

  useMousetrap('right', () => actions.move({
    playerIndex: settings.type === 'online' ? getMe()?.index : 1,
    direction: 'x',
    movement: 1
  }))

  useMousetrap('space', () => actions.bomb({
    playerIndex: settings.type === 'online' ? getMe()?.index : 1,
  }))

  useMousetrap('w', () => actions.move({ playerIndex: 0, direction: 'y', movement: -1 }))
  useMousetrap('s', () => actions.move({ playerIndex: 0, direction: 'y', movement: 1 }))
  useMousetrap('a', () => actions.move({ playerIndex: 0, direction: 'x', movement: -1 }))
  useMousetrap('d', () => actions.move({ playerIndex: 0, direction: 'x', movement: 1 }))
  useMousetrap('shift', () => actions.bomb({ playerIndex: 0 }))
}
