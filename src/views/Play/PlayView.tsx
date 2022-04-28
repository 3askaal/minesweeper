import React, { useContext, useEffect } from 'react'
import { Container, Wrapper, Popup, Button, Text, Spacer } from '3oilerplate'
import { Smile as SmileIcon, Frown as FrownIcon } from 'react-feather'
import { Map, Timer } from '../../components'
import { GameContext } from '../../context'
import { useKeyboardBindings } from '../../helpers/keyboard'
import ReactGA4 from 'react-ga4'

const PlayView = () => {
  const { onStartGame, gameOver, remainingBlocks, setTime } = useContext(GameContext)

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
        <Spacer size="l" s={{ pb: 'm', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Timer />
          <Button onClick={onStartGame} isOutline>
            { gameOver ? <FrownIcon size={18} /> : <SmileIcon size={18} /> }
          </Button>
          <Text s={{ textAlign: 'center' }}>{ remainingBlocks }</Text>
        </Spacer>
        <Map />
      </Container>
      { gameOver && (
        <Popup
          actions={[
            <Button onClick={onStartGame}>Restart</Button>
          ]}
        >
          <Text s={{ width: '100%', textAlign: 'center' }}>
            { gameOver.won ? 'You won! Click restart to play again.' : 'You stepped on a mine! Click restart to play again.' }
          </Text>
        </Popup>
      ) }
    </Wrapper>
  )
}

export default PlayView
