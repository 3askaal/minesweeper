import { times, sampleSize } from 'lodash'

export const generateGrid = (blocks: number) => {
  let newGrid: any = {}
  const positionAmount = (blocks * blocks) + blocks + blocks + 1

  times(positionAmount, (i) => {
    const y = (i - (i % (blocks + 1))) / (blocks + 1)
    const x = i % (blocks + 1)

    newGrid[`${x}/${y}`] = { x, y, block: true }
  })

  newGrid = generateBombs(newGrid)

  return newGrid
}

export const generateBombs = (grid: any) => {
  let newGrid = { ...grid }

  const positions = Object.values(grid)

  const bombPositions = sampleSize(positions, Math.round(positions.length * .2))

  bombPositions.forEach(({x, y}: any) => {
    newGrid = { ...newGrid, [`${x}/${y}`]: { ...newGrid[`${x}/${y}`], bomb: true }}
  })

  positions.forEach((position: any) => {
    const { x: rootX , y: rootY } = position

    const amountBombsSurrounding = Object.values(newGrid)
      .map(({ x, y, ...rest }: any) => ({ ...rest, x: Math.abs(rootX - x), y: Math.abs(rootY - y)}))
      .filter(({ bomb, x, y }) => bomb && x < 2 && y < 2)
      .length

    const item = newGrid[`${rootX}/${rootY}`]

    if (amountBombsSurrounding && !item.bomb) {
      newGrid = { ...newGrid, [`${rootX}/${rootY}`]: { ...newGrid[`${rootX}/${rootY}`], thread: true, amount: amountBombsSurrounding  }}
    }
  })

  return newGrid
}
