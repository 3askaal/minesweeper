import { uniqBy } from "lodash"
import { IGrid, IPosition } from "../types"

export const isEmptyPosition = (pos: IPosition, countThreads?: boolean) => {
  return (countThreads || !pos.thread) && !pos.mine
}

export const getEmptySurroundingPositions = (grid: IGrid, { x, y }: IPosition, thread?: boolean): IPosition[] => {
  let surroundingPositions = [
    { x, y: y - 1 },
    { x, y: y + 1 },
    { x: x - 1, y },
    { x: x + 1, y },
    { x: x - 1, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y: y + 1 },
    { x: x + 1, y: y + 1 },
  ]

  surroundingPositions = surroundingPositions
    .map((pos) => {
      return grid[`${pos.x}/${pos.y}`]
    })
    .filter((pos) => {
      return pos &&
        pos.block &&
        isEmptyPosition(pos, thread)
    })

  return surroundingPositions as IPosition[]
}

export const getPositions = (grid: IGrid) => {
  return Object.values(grid)
}

export const flag = (grid: IGrid, position: IPosition) => {
  const newGrid = { ...grid }
  const item = newGrid[`${position.x}/${position.y}`]
  newGrid[`${position.x}/${position.y}`].flag = !item.flag

  return [newGrid]
}

export const reveal = (grid: IGrid, position: IPosition): [IGrid, boolean?] => {
  let newGrid = { ...grid }
  newGrid[`${position.x}/${position.y}`].block = false

  if (position.mine) {
    return [newGrid, true]
  }

  if (isEmptyPosition(position)) {
    let checkedEmptyPositions: IPosition[] = []
    let uncheckedEmptyPositions: IPosition[] = [ position ]

    while (uncheckedEmptyPositions.length) {
      let newUncheckedEmptyPositions: IPosition[] = []

      uncheckedEmptyPositions.forEach((uncheckedEmptyPosition) => {
        const emptySurroundingPositions = getEmptySurroundingPositions(newGrid, uncheckedEmptyPosition)
          .filter((pos) => !checkedEmptyPositions.find(({ x, y }) => x === pos.x && y === pos.y))

        newUncheckedEmptyPositions = [...newUncheckedEmptyPositions, ...emptySurroundingPositions]
      })

      checkedEmptyPositions = [...checkedEmptyPositions, ...uncheckedEmptyPositions]
      uncheckedEmptyPositions = uniqBy(newUncheckedEmptyPositions, ({x, y}: IPosition) => `${x}/${y}`)
    }

    checkedEmptyPositions.forEach((checkedEmptyPosition) => {
      const key = `${checkedEmptyPosition.x}/${checkedEmptyPosition.y}`
      newGrid = { ...newGrid, [key]: { ...checkedEmptyPosition, block: false } }

      const newFreeSurroundingPositions = getEmptySurroundingPositions(newGrid, checkedEmptyPosition, true)

      newFreeSurroundingPositions.forEach((newFreeSurroundingPosition) => {
        const key = `${newFreeSurroundingPosition.x}/${newFreeSurroundingPosition.y}`
        newGrid = { ...newGrid, [key]: { ...newFreeSurroundingPosition, block: false } }
      })
    })
  }

  return [newGrid]
}
