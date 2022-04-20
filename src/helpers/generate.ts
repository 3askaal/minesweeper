import { times, sampleSize } from 'lodash'

export const generateGrid = (blocks: number) => {
  let newGrid: any = {}
  const amountBricksForUnevenCube = (blocks * blocks) + blocks + blocks + 1

  times(amountBricksForUnevenCube, (i) => {
    const y = (i - (i % (blocks + 1))) / (blocks + 1)
    const x = i % (blocks + 1)

    newGrid[`${x}/${y}`] = { x, y, stone: true }
  })

  newGrid = generateBombs(newGrid)
  // newGrid = generateStones(newGrid)

  return newGrid
}

export const generateBombs = (grid: any) => {
  let newGrid = { ...grid }

  const freeSpaces = Object.values(grid)

  const newBricks = sampleSize(freeSpaces, freeSpaces.length * .1)

  newBricks.forEach(({x, y}: any) => {
    newGrid = { ...newGrid, [`${x}/${y}`]: { ...newGrid[`${x}/${y}`], bomb: true }}
  })

  return newGrid
}

export const generateStones = (grid: any) => {
  let newGrid = { ...grid }

  const freeSpaces = Object.values(grid)

  const newBricks = sampleSize(freeSpaces, freeSpaces.length * 0.6)

  newBricks.forEach(({x, y}: any) => {
    newGrid = { ...newGrid, [`${x}/${y}`]: { ...newGrid[`${x}/${y}`], stone: true }}
  })

  return newGrid
}
