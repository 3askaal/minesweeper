import React, { useMemo } from 'react'
import { Box } from '3oilerplate'
import { SMap, SMapBlock, SMapMine, SMapMineThread } from './Map.styled'
import { useLongPress } from 'use-long-press'
import { flag } from '../../helpers/grid'
import { IGrid, IPosition } from '../../types'

export const Map = ({ grid, gameResult, settings, onClick }: any) => {
  const blockSizeX = 100 / settings.mode.width
  const blockSizeY = 100 / settings.mode.height
  const positions = useMemo(() => Object.values(grid || {}), [grid])

  const bindLongPress = useLongPress((e, { context }) => flag(grid as IGrid, context as IPosition));

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
