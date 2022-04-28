import React, { useContext, useEffect, useRef, useState } from 'react'
import { min, uniqBy } from 'lodash'
import { Box } from '3oilerplate'
import { SMap, SMapBlock, SMapBomb, SMapBombMarker } from './Map.styled'
import { GameContext } from '../../context'
import { useLongPress } from 'use-long-press';
import { IGrid, IPosition } from '../../types';

const isEmptyPosition = (pos: IPosition, countThreads?: boolean) => {
  return (countThreads || !pos.thread) && !pos.bomb
}

const getEmptySurroundingPositions = (grid: IGrid, { x, y }: IPosition, thread?: boolean): IPosition[] => {
  let surroundingPositions = [
    { x, y: y - 1 },
    { x, y: y + 1 },
    { x: x - 1, y },
    { x: x + 1, y },
  ]

  if (thread) {
    surroundingPositions = [
      ...surroundingPositions,
      { x: x - 1, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x - 1, y: y + 1 },
      { x: x + 1, y: y + 1 },
    ]
  }

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

export const Map = () => {
  const { grid, setGrid, gameActive, setGameActive, gameOver, setGameOver, settings, currentTime, setCurrentTime } = useContext(GameContext)
  const bindLongPress = useLongPress((e, { context }) => {
    flag(context as IPosition)
  });


  const getPositions = () => {
    return grid ? Object.values(grid) : []
  }

  const reveal = (position: IPosition) => {
    if (position.bomb) {
      setGameOver({ won: false })
      return
    }

    let newGrid = { ...grid }
    newGrid[`${position.x}/${position.y}`].block = false

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

    setGrid(newGrid)
  }

  const flag = (position: IPosition) => {
    const newGrid = { ...grid }
    const item = newGrid[`${position.x}/${position.y}`]
    newGrid[`${position.x}/${position.y}`].flag = !item.flag
    setGrid(newGrid)
  }

  const onClick = (e: React.MouseEvent, block: IPosition) => {
    e.shiftKey ? flag(block) : block.flag ? flag(block) : reveal(block)

    if (!gameActive) {
      setGameActive(true)
    }
  }

  const blockSize = 100 / settings.blocks

  return (
    <SMap gameOver={!!gameOver}>
      { getPositions().map((position: any, index: number) => (
        <Box
          s={{
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            width: `${blockSize}%`,
            height: `${blockSize}%`,
            // left: `${blockSize * position.x}%`,
            // top: `${blockSize * position.y}%`
          }}
        >
          { position.bomb ? (
            <SMapBomb
              key={`bomb-${index}`}
            />
          ) : null }
          { position.thread ? (
            <SMapBombMarker
              key={`thread-${index}`}
              amount={position.amount}
            >
              { position.amount }
            </SMapBombMarker>
          ): null}
          { (!gameOver || !position.bomb) && (
            <SMapBlock
              key={`block-${index}`}
              flagged={position.flag}
              block={position.block}
              {...bindLongPress(position)}
              onClick={(e: React.MouseEvent) => onClick(e, position)}
            />
          )}
        </Box>
      )) }
    </SMap>
  )
}
