import React, { useContext } from "react"
import useMousetrap from "react-hook-mousetrap"
import { GameContext } from "../context"

export function useKeyboardBindings() {
  useMousetrap('w', () => {})
  useMousetrap('s', () => {})
  useMousetrap('a', () => {})
  useMousetrap('d', () => {})
  useMousetrap('shift', () => {})
}
