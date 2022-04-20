import React, { useContext, useEffect, useState } from 'react'
import { SMap, SMapStone, SMapBomb, SMapBombMarker } from './Map.styled'
import { GameContext } from '../../context'

export const Map = ({ style, blocks } : any) => {
  const { grid, setGrid }: any = useContext(GameContext)
  const [bombMarkers, setBombMarkers] = useState<any[]>([])

  const getStones = () => {
    return grid ? Object.values(grid).filter(({ stone }: any) => stone) : []
  }

  const getBombs = () => {
    return grid ? Object.values(grid).filter(({ bomb }: any) => bomb) : []
  }

  useEffect(() => {
    if (grid) {
      const newBombMarkers: any[] = Object.values(grid)
        .map((item: any) => {
          const { x: rootX , y: rootY } = item

          const amountBombsSurrounding = Object.values(grid)
            .map(({ x, y, ...rest }: any) => ({ ...rest, x: Math.abs(rootX - x), y: Math.abs(rootY - y)}))
            .filter(({ bomb, x, y }) => bomb && x < 2 && y < 2)
            .length

            return {
              amount: amountBombsSurrounding,
              ...item,
            }
        })
        .filter(({ amount, bomb }) => amount && !bomb)

      setBombMarkers(newBombMarkers)
    }
  }, [grid])

  const breakStone = ({ x, y }: any) => {
    const newGrid = { ...grid }
    newGrid[`${x}/${y}`].stone = false
    setGrid(newGrid)
  }

  return (
    <SMap style={{style}} blocks={blocks + 1}>
      { getBombs().map(({x, y}: any, index: number) => (
        <SMapBomb
          key={index}
          s={{
            left: `${x}rem`,
            top: `${y}rem`
          }}
        />
      )) }
      { bombMarkers.map(({x, y, amount}: any, index: number) => (
        <SMapBombMarker
          key={index}
          amount={amount}
          s={{
            left: `${x}rem`,
            top: `${y}rem`
          }}
        >
          { amount }
        </SMapBombMarker>
      )) }
      { getStones().map(({x, y}: any, index: number) => (
        <SMapStone
          key={index}
          s={{
            left: `${x}rem`,
            top: `${y}rem`
          }}
          onClick={() => breakStone({ x, y })}
        />
      )) }
    </SMap>
  )
}
