import React, { useContext } from "react"
import useMousetrap from "react-hook-mousetrap"
import { GameContext, SocketContext } from "../context"

export function useKeyboardBindings() {
  const { onGameMove, onGameBomb } = useContext(GameContext)
  const { move, bomb } = useContext(SocketContext)

  useMousetrap('w', () => {})
  useMousetrap('s', () => {})
  useMousetrap('a', () => {})
  useMousetrap('d', () => {})
  useMousetrap('shift', () => {})
}
