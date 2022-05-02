import { times, sampleSize } from 'lodash'
import { ISettings } from '../types'

export const generateGrid = ({ mode }: ISettings) => {
  let newGrid: any = {}
  const positionAmount = (mode.width * mode.height)

  times(positionAmount, (i) => {
    const y = (i - (i % mode.width)) / mode.height
    const x = i % (mode.width)

    newGrid[`${x}/${y}`] = { x, y, block: true }
  })

  newGrid = generateMines(newGrid, mode.mines)

  return newGrid
}

export const generateMines = (grid: any, mines: number) => {
  let newGrid = { ...grid }

  const positions = Object.values(grid)

  const minePositions = sampleSize(positions, mines)

  minePositions.forEach(({x, y}: any) => {
    newGrid = { ...newGrid, [`${x}/${y}`]: { ...newGrid[`${x}/${y}`], mine: true }}
  })

  positions.forEach((position: any) => {
    const { x: rootX , y: rootY } = position

    const amountMinesSurrounding = Object.values(newGrid)
      .map(({ x, y, ...rest }: any) => ({ ...rest, x: Math.abs(rootX - x), y: Math.abs(rootY - y)}))
      .filter(({ mine, x, y }) => mine && x < 2 && y < 2)
      .length

    const item = newGrid[`${rootX}/${rootY}`]

    if (amountMinesSurrounding && !item.mine) {
      newGrid = { ...newGrid, [`${rootX}/${rootY}`]: { ...newGrid[`${rootX}/${rootY}`], thread: true, amount: amountMinesSurrounding  }}
    }
  })

  return newGrid
}
