import React, { ReactEventHandler, ReactFragment, useContext, useEffect, useState } from 'react'
import { SMap, SMapBlock, SMapBomb, SMapBombMarker } from './Map.styled'
import { GameContext } from '../../context'
import { useLongPress } from 'use-long-press';

export const Map = ({ style, blocks } : any) => {
  const { grid, setGrid, gameOver, setGameOver }: any = useContext(GameContext)
  const bindLongPress = useLongPress((e, { context }) => {
    flag(context)
  });

  const getPositions = () => {
    return grid ? Object.values(grid) : []
  }

  const reveal = (position: any) => {
    if (position.bomb) {
      setGameOver({ won: false })
    }

    const newGrid = { ...grid }
    newGrid[`${position.x}/${position.y}`].block = false
    setGrid(newGrid)
  }

  const flag = (position: any) => {
    const newGrid = { ...grid }
    const item = newGrid[`${position.x}/${position.y}`]
    newGrid[`${position.x}/${position.y}`].flag = !item.flag
    setGrid(newGrid)
  }

  const onClick = (e: React.MouseEvent, block: any) => {
    e.shiftKey ? flag(block) : reveal(block)
  }

  useEffect(() => {
    if (grid) {
      const remainingBlocks = Object.values(grid).filter((position: any) => {
        return position.block && !position.bomb
      }).length

      if (!remainingBlocks) {
        setGameOver({ won: true })
      }
    }
  }, [grid])

  return (
    <SMap style={{style}} blocks={blocks + 1}>
      { getPositions().map((position: any, index: number) => (
        <>
          { position.bomb ? (
            <SMapBomb
              key={`bomb-${index}`}
              s={{
                left: `${position.x}rem`,
                top: `${position.y}rem`
              }}
            />
          ) : null }
          { position.marker ? (
            <SMapBombMarker
              key={`marker-${index}`}
              amount={position.amount}
              s={{
                left: `${position.x}rem`,
                top: `${position.y}rem`
              }}
            >
              { position.amount }
            </SMapBombMarker>
          ): null}
          <SMapBlock
            key={`block-${index}`}
            flagged={position.flag}
            block={position.block}
            gameOver={!!gameOver}
            {...bindLongPress(position)}
            s={{
              left: `${position.x}rem`,
              top: `${position.y}rem`
            }}
            onClick={(e: React.MouseEvent) => onClick(e, position)}
          />
        </>
      )) }
    </SMap>
  )
}
