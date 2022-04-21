import React, { useContext, useEffect } from 'react'
import { Container, Wrapper, Box, Popup, Button, Text } from '3oilerplate'
import ReactGA from 'react-ga4'
import { Map } from '../../components'
import { GameContext } from '../../context'
import ReactGA4 from 'react-ga4'
import faker from 'faker'
import { Timer } from '../../components/Timer/Timer'
import { useKeyboardBindings } from '../../helpers/keyboard'
import { useHistory, useLocation } from 'react-router-dom'

const PlayView = () => {
  const search = useLocation().search;
  const { onStartGame, blocks, gameOver } = useContext(GameContext)

  useKeyboardBindings()

  useEffect(() => {
    onStartGame()
  }, [])

  return (
    <Wrapper s={{ padding: ['xs', 'xs', 's'] }}>
      <Container s={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', }}>
        <Box>
          <Map blocks={blocks} />
        </Box>
      </Container>
      { gameOver && (
        <Popup
          actions={[
            <Button onClick={() => onStartGame({}, false)}>Restart</Button>
          ]}
        >
          <Text s={{ textAlign: 'center' }}>
            You stepped on a mine! Click restart to play again!
          </Text>
        </Popup>
      ) }
    </Wrapper>
  )
}

export default PlayView
