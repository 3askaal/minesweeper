import { s } from '3oilerplate'

export const SApp = s.div(({ theme }: any) => ({
  fontFamily: theme.fonts.base,
  color: theme.colors.white,
  backgroundColor: theme.colors.background,
  width: '100%',
  height: '100%',
  flexGrow: 1,
}))
