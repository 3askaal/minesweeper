import { s } from '3oilerplate'
import chroma from 'chroma-js'

export const SMap = s.div(({ theme, width, height, gameOver }: any) => ({
  display: 'flex',
  position: 'relative',
  width: '100%',
  maxWidth: '500px',
  aspectRatio: '1 / 1',
  border: '.25rem solid',

  // Light
  borderRightColor: chroma('#fff').darken(0.5).hex(),
  borderTopColor: chroma('#fff').darken(0.5).hex(),
  // Middle
  backgroundColor: chroma('#fff').darken(1).hex(),
  // Dark
  borderLeftColor: chroma('#fff').darken(1.5).hex(),
  borderBottomColor: chroma('#fff').darken(1.5).hex(),
  userSelect: 'none',

  ...(gameOver && {
    [SMapBlock]: {
      // Light
      borderTopColor: chroma('#FD0054').brighten(1).hex(),
      borderRightColor: chroma('#FD0054').brighten(1).hex(),
      // Middle
      backgroundColor: chroma('#FD0054').hex(),
      // Dark
      borderLeftColor: chroma('#FD0054').darken(1).hex(),
      borderBottomColor: chroma('#FD0054').darken(1).hex(),
    }
  })
}))

export const SMapBlock = s.div(({ theme, blocks, block, flagged }: any) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderStyle: 'solid',
  borderWidth: ['0.8vw', '0.8vw', '4px'],
  cursor: 'pointer',

  // Light
  borderTopColor: chroma('#AAAAAA').darken(0.25).hex(),
  borderRightColor: chroma('#AAAAAA').darken(0.5).hex(),
  // Middle
  backgroundColor: chroma('#AAAAAA').darken(1.5).hex(),
  // Dark
  borderLeftColor: chroma('#AAAAAA').darken(2.5).hex(),
  borderBottomColor: chroma('#AAAAAA').darken(2.75).hex(),

  ...(!block && {
    opacity: 0,
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
}))

const threadColors = [
  '#07689F',
  '#019267',
  '#E84545',
  '#27496D',
  '#630606',
  '#069A8E',
  '#383838',
  '#6D8299'
]

export const SMapBombMarker = s.div(({ theme, blocks, amount }: any) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: threadColors[amount - 1],
  fontWeight: 'bold',
}))

export const SMapBomb = s.div(({ blocks }: any) => ({
  position: 'absolute',
  borderRadius: '100%',
  width: '60%',
  height: '60%',
  backgroundColor: '#222',
}))
