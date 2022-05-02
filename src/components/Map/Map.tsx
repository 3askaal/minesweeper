import React, { useContext } from 'react'
import { uniqBy } from 'lodash'
import { Box } from '3oilerplate'
import { SMap, SMapBlock, SMapMine, SMapMineThread } from './Map.styled'
import { GameContext } from '../../context'
import { useLongPress } from 'use-long-press';
import { IGrid, IPosition } from '../../types';

const isEmptyPosition = (pos: IPosition, countThreads?: boolean) => {
  return (countThreads || !pos.thread) && !pos.mine
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
  const { grid, setGrid, gameActive, setGameActive, gameOver, setGameOver, settings } = useContext(GameContext)
  const bindLongPress = useLongPress((e, { context }) => flag(context as IPosition));

  const getPositions = () => {
    return grid ? Object.values(grid) : []
  }

  const reveal = (position: IPosition) => {
    if (position.mine) {
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

  const blockSizeX = 100 / settings.mode.width
  const blockSizeY = 100 / settings.mode.height

  return (
    <SMap mode={settings.mode} gameOver={!!gameOver}>
      { getPositions().map((position: any, index: number) => (
        <Box
          s={{
            display: 'flex',
            position: 'relative',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            width: `${blockSizeX}%`,
            height: `${blockSizeY}%`,
            // position: 'absolute',
            // left: `${position.x}rem`,
            // top: `${position.y}rem`
          }}
        >
          { position.mine ? (
            <SMapMine
              key={`mine-${index}`}
            />
          ) : null }
          { position.thread ? (
            <SMapMineThread
              key={`thread-${index}`}
              amount={position.amount}
            >
              { position.amount }
            </SMapMineThread>
          ): null}
          { (!gameOver || !position.mine) && (
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
