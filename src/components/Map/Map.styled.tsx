import { s, darken } from '3oilerplate'
import chroma from 'chroma-js'

export const SMap = s.div(({ theme, blocks }: any) => ({
  display: 'flex',
  position: 'relative',
  height: `calc(${blocks}rem + .5rem)`,
  width: `calc(${blocks}rem + .5rem)`,
  border: '.25rem solid',
  // Light
  borderRightColor: chroma('#fff').darken(0.5).hex(),
  borderTopColor: chroma('#fff').darken(0.5).hex(),
  // Middle
  backgroundColor: chroma('#fff').darken(1).hex(),
  // Dark
  borderLeftColor: chroma('#fff').darken(1.5).hex(),
  borderBottomColor: chroma('#fff').darken(1.5).hex(),
  userSelect: 'none'
}))

export const SMapBlock = s.div(({ theme, block, flagged, gameOver }: any) => ({
  position: 'absolute',
  width: '1rem',
  height: '1rem',
  border: '0.15rem solid',
  cursor: 'pointer',

  // Light
  borderTopColor: chroma('#fff').darken(1.5).hex(),
  borderRightColor: chroma('#fff').darken(1.5).hex(),
  // Middle
  backgroundColor: chroma('#fff').darken(2.5).hex(),
  // Dark
  borderLeftColor: chroma('#fff').darken(3.5).hex(),
  borderBottomColor: chroma('#fff').darken(3.5).hex(),

  ...(!block && {
    opacity: 0,
    // backgroundColor: 'transparent',
    pointerEvents: 'none',
  }),

  ...(flagged && {
    // Light
    borderTopColor: chroma('#C9485B').brighten(1).hex(),
    borderRightColor: chroma('#C9485B').brighten(1).hex(),
    // Middle
    backgroundColor: chroma('#C9485B').hex(),
    // Dark
    borderLeftColor: chroma('#C9485B').darken(1).hex(),
    borderBottomColor: chroma('#C9485B').darken(1).hex(),
  }),

  ...(gameOver && {
    // Light
    borderTopColor: chroma('#FD0054').brighten(1).hex(),
    borderRightColor: chroma('#FD0054').brighten(1).hex(),
    // Middle
    backgroundColor: chroma('#FD0054').hex(),
    // Dark
    borderLeftColor: chroma('#FD0054').darken(1).hex(),
    borderBottomColor: chroma('#FD0054').darken(1).hex(),
  })
}))

const markerColors = [
  'blue',
  'green',
  'red',
  'darkblue',
  'red',
  'cyan',
  'purple',
  'darkgrey'
]

export const SMapBombMarker = s.div(({ theme, amount }: any) => ({
  position: 'absolute',
  width: '1rem',
  height: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: markerColors[amount - 1],
  fontWeight: 'bold',
  fontSize: '.8em'
}))

export const SMapBomb = s.div(() => ({
  position: 'absolute',
  borderRadius: '100%',
  width: '.8rem',
  height: '.8rem',
  margin: '.1rem',
  backgroundColor: '#222',
  // border: '0.15rem solid #555',
}))
