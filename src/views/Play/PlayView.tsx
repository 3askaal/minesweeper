import React, { useContext, useEffect } from 'react'
import { Container, Wrapper, Popup, Button, Text } from '3oilerplate'
import { Map } from '../../components'
import { GameContext } from '../../context'
import { useKeyboardBindings } from '../../helpers/keyboard'
import ReactGA4 from 'react-ga4'

const PlayView = () => {
  const { onStartGame, gameOver, remainingBlocks } = useContext(GameContext)

  useKeyboardBindings()

  useEffect(() => {
    onStartGame()

    ReactGA4.event({
      category: "actions",
      action: "game:start",
    });
  }, [])

  useEffect(() => {
    if (gameOver?.won) {
      ReactGA4.event({
        category: "actions",
        action: "game:won",
      });
    }

    if (gameOver?.won === false) {
      ReactGA4.event({
        category: "actions",
        action: "game:lost",
      });
    }
  }, [gameOver])

  return (
    <Wrapper>
      <Container s={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Text s={{ pb: 'm', textAlign: 'center' }}>Remaining: { remainingBlocks }</Text>
        <Map />
      </Container>
      { gameOver && (
        <Popup
          actions={[
            <Button onClick={() => onStartGame({}, false)}>Restart</Button>
          ]}
        >
          <Text s={{ textAlign: 'center' }}>
            { gameOver.won ? 'You won! Click restart to play again.' : 'You stepped on a mine! Click restart to play again.' }
          </Text>
        </Popup>
      ) }
    </Wrapper>
  )
}

export default PlayView
