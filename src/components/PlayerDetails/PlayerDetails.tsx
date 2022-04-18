import React, { useContext } from 'react'
import { Box, Text, Spacer } from '3oilerplate'
import { SPlayerDetails, SPlayerDetailsMove, SPlayerDetailsMiddle, SPlayerDetailsButton, SPlayerDetailsHealth, SPlayerDetailsHealthProgress } from './PlayerDetails.styled'
import {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Crosshair
} from 'react-feather'
import isMobile from 'is-mobile'
import { GameContext } from '../../context'

export const PlayerDetails = ({ onMove, onBomb, player }: any) => {
  const { settings } = useContext(GameContext)

  const playerIndex = settings.type === 'online' ? 1 : player.index

  return (
    <SPlayerDetails>
      { playerIndex === 0 && (
        <Spacer size="xxs">
          <Box s={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Text>{ player.name }</Text>
          </Box>
          <SPlayerDetailsHealth index={playerIndex} health={player.health}>
            <SPlayerDetailsHealthProgress index={playerIndex} health={player.health} />
          </SPlayerDetailsHealth>
        </Spacer>
      )}
      <Box s={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: ['flex-start', 'flex-end'][playerIndex]
      }}>
        { playerIndex === 0 ? (
          <SPlayerDetailsButton
            color={player.color}
            type="bomb"
            index={playerIndex}
            {...isMobile() ? {
              onTouchStart: () => onBomb()
            } : {
              onMouseDown: () => onBomb()
            }}
            s={{
              touchAction: isMobile() ? 'auto' : 'none',
            }}
          >
            <Crosshair />
          </SPlayerDetailsButton>
        ) : null }
        <SPlayerDetailsMove s={{ alignItems: ['flex-start', 'flex-end'][playerIndex] }}>
          <SPlayerDetailsButton
            color={player.color}
            type="left"
            index={playerIndex}
            {...isMobile() ? {
              onTouchStart: () => onMove('x',  -1)
            } : {
              onMouseDown: () => onMove('x',  -1)
            }}
            s={{
              touchAction: isMobile() ? 'auto' : 'none',
            }}
          >
            <ChevronLeft />
          </SPlayerDetailsButton>
          <SPlayerDetailsMiddle>
            <SPlayerDetailsButton
              color={player.color}
              type="up"
              index={playerIndex}
              {...isMobile() ? {
                onTouchStart: () => onMove('y',  -1)
              } : {
                onMouseDown: () => onMove('y',  -1)
              }}
              s={{
                touchAction: isMobile() ? 'auto' : 'none',
              }}
            >
              <ChevronUp />
            </SPlayerDetailsButton>
            <SPlayerDetailsButton
              color={player.color}
              type="down"
              index={playerIndex}
              {...isMobile() ? {
                onTouchStart: () => onMove('y', 1)
              } : {
                onMouseDown: () => onMove('y', 1)
              }}
              s={{
                touchAction: isMobile() ? 'auto' : 'none',
              }}
            >
              <ChevronDown />
            </SPlayerDetailsButton>
          </SPlayerDetailsMiddle>
          <SPlayerDetailsButton
            color={player.color}
            type="right"
            index={playerIndex}
            {...isMobile() ? {
              onTouchStart: () => onMove('x', 1)
            } : {
              onMouseDown: () => onMove('x', 1)
            }}
            s={{
              touchAction: isMobile() ? 'auto' : 'none',
            }}
          >
            <ChevronRight />
          </SPlayerDetailsButton>
        </SPlayerDetailsMove>
        { playerIndex === 1 ? (
          <SPlayerDetailsButton
            color={player.color}
            type="bomb"
            index={playerIndex}
            {...isMobile() ? {
              onTouchStart: () => onBomb()
            } : {
              onMouseDown: () => onBomb()
            }}
            s={{
              touchAction: isMobile() ? 'auto' : 'none',
            }}
          >
            <Crosshair />
          </SPlayerDetailsButton>
        ) : null }
      </Box>
      { playerIndex === 1 && (
        <Spacer size="xxs">
          <SPlayerDetailsHealth index={playerIndex}>
            <SPlayerDetailsHealthProgress index={playerIndex} health={player.health} />
          </SPlayerDetailsHealth>
          <Text>{ player.name }</Text>
        </Spacer>
      )}
    </SPlayerDetails>
  )
}
