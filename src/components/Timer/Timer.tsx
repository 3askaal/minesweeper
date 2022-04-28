import React, { useContext } from 'react'
import { Box } from '3oilerplate'
import moment from 'moment'
import { GameContext } from '../../context'

export const Timer = ({ s }: any) => {
  const { currentTime }: any = useContext(GameContext)

  const getTimeLabel = () => {
    return moment.utc(currentTime || 0).format('m:ss')
  }

  return <Box s={s}>{ getTimeLabel() }</Box>
}
