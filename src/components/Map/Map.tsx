import React, { useCallback, useContext, useMemo } from 'react'
import { Box } from '3oilerplate'
import { SMap, SMapBlock, SMapMine, SMapMineThread } from './Map.styled'
import { GameContext } from '../../context'
import { useLongPress } from 'use-long-press';
import { IGrid, IPosition } from '../../types';
import { flag, reveal } from '../../helpers/grid'

export const Map = () => {
  const { grid, setGrid, gameActive, setGameActive, gameResult, setGameResult, settings } = useContext(GameContext)
  const bindLongPress = useLongPress((e, { context }) => flag(grid as IGrid, context as IPosition));

  const blockSizeX = 100 / settings.mode.width
  const blockSizeY = 100 / settings.mode.height
  const positions = useMemo(() => Object.values(grid || {}), [grid])

  const onClick = (e: React.MouseEvent, block: IPosition) => {
    if (!grid) return

    if (!gameActive) {
      setGameActive(true)
    }

    const [newGrid, gameOver] = e.shiftKey ? flag(grid, block) : block.flag ? flag(grid, block) : reveal(grid, block)
    setGrid(newGrid)

    if (gameOver) {
      setGameResult({ won: false })
    }
  }

  return (
    <SMap mode={settings.mode} gameOver={!!gameResult}>
      { positions.map((position: any, index: number) => (
        <Box
          key={`block-${index}`}
          s={{
            display: 'flex',
            position: 'relative',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            width: `${blockSizeX}%`,
            height: `${blockSizeY}%`
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
          { (!gameResult || !position.mine) && (
            <SMapBlock
              key={`block-${index}`}
              flag={position.flag}
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
