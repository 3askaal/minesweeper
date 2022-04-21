import { colors } from './colors'
import { fonts } from './fonts'

export const localTheme = {
  rootFontSizes: ['16px', '18px', '20px', '22px', '24px'],
  breakpoints: ['320px', '360px', '400px', '440px'],
  colors,
  fonts,
  components: {
    Input: {
      default: {
        padding: 'xs',
      },
      variants: {
        isBlock: {
          width: '100% !important'
        }
      }
    },
    Button: {
      default: {
        paddingX: 's',
        paddingY: 'xs',
        borderWidth: '2px',
      },
      variants: {
        isReady: {
          backgroundColor: 'transparent',
          color: 'positive',
          borderColor: 'positive',

          ':hover': {
            backgroundColor: 'positive',
            color: 'background',
            borderColor: 'positive',
          }
        }
      }
    },
  },
}
