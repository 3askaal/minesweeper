import React, { useContext, useState } from 'react'
import { SMap, SMapStone, SMapBomb, SMapBombMarker } from './Map.styled'
import { GameContext } from '../../context'

export const Map = ({ style, blocks } : any) => {
  const { grid, setGrid, setGameOver }: any = useContext(GameContext)

  const getPositions = () => {
    return grid ? Object.values(grid) : []
  }

  const reveal = (block: any) => {
    if (block.bomb) {
      setGameOver(true)
    }

    const newGrid = { ...grid }
    newGrid[`${block.x}/${block.y}`].hidden = false
    setGrid(newGrid)
  }

  return (
    <SMap style={{style}} blocks={blocks + 1}>
      { getPositions().map((block: any, index: number) => (
        <>
          { block.bomb ? (
            <SMapBomb
              key={`bomb-${index}`}
              s={{
                left: `${block.x}rem`,
                top: `${block.y}rem`
              }}
            />
          ) : null }
          { block.marker ? (
            <SMapBombMarker
              key={`marker-${index}`}
              amount={block.amount}
              s={{
                left: `${block.x}rem`,
                top: `${block.y}rem`
              }}
            >
              { block.amount }
            </SMapBombMarker>
          ): null}
          { block.hidden ? (
            <SMapStone
              key={`stone-${index}`}
              s={{
                left: `${block.x}rem`,
                top: `${block.y}rem`
              }}
              onClick={() => reveal(block)}
            />
          ) : null }
        </>
      )) }
    </SMap>
  )
}
