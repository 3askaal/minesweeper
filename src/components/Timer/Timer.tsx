import React, { useContext } from 'react'
import { Box } from '3oilerplate'
import moment from 'moment'
import { GameContext } from '../../context'

export const Timer = ({ s, until }: any) => {
  const { remainingTime }: any = useContext(GameContext)

  const getTimeLabel = () => {
    return moment.utc(remainingTime).format('mm:ss')
  }

  return remainingTime ? <Box s={s}>{ getTimeLabel() }</Box> : null
}
