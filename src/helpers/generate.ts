import { times, sampleSize } from 'lodash'

export const generateGrid = (blocks: number) => {
  let newGrid: any = {}
  const amountBricksForUnevenCube = (blocks * blocks) + blocks + blocks + 1

  times(amountBricksForUnevenCube, (i) => {
    const y = (i - (i % (blocks + 1))) / (blocks + 1)
    const x = i % (blocks + 1)

    newGrid[`${x}/${y}`] = { x, y, hidden: true }
  })

  newGrid = generateBombs(newGrid)

  return newGrid
}

export const generateBombs = (grid: any) => {
  let newGrid = { ...grid }

  const freeSpaces = Object.values(grid)

  const bombPositions = sampleSize(freeSpaces, freeSpaces.length * .1)

  bombPositions.forEach(({x, y}: any) => {
    newGrid = { ...newGrid, [`${x}/${y}`]: { ...newGrid[`${x}/${y}`], bomb: true }}
  })

  freeSpaces.forEach((position: any) => {
    const { x: rootX , y: rootY } = position

    const amountBombsSurrounding = Object.values(newGrid)
      .map(({ x, y, ...rest }: any) => ({ ...rest, x: Math.abs(rootX - x), y: Math.abs(rootY - y)}))
      .filter(({ bomb, x, y }) => bomb && x < 2 && y < 2)
      .length

    const item = newGrid[`${rootX}/${rootY}`]

    if (amountBombsSurrounding && !item.bomb) {
      newGrid = { ...newGrid, [`${rootX}/${rootY}`]: { ...newGrid[`${rootX}/${rootY}`], marker: true, amount: amountBombsSurrounding  }}
    }
  })

  return newGrid
}
