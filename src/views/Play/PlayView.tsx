import React, { useContext, useEffect } from 'react'
import { Container, Wrapper, Button, Text, Spacer, Popup } from '3oilerplate'
import { Smile as SmileIcon, Frown as FrownIcon } from 'react-feather'
import { Map, Timer } from '../../components'
import { GameContext } from '../../context'
import { useKeyboardBindings } from '../../helpers/keyboard'
import ReactGA4 from 'react-ga4'

const PlayView = () => {
  const { onStartGame, gameOver, remainingBlocks, settings } = useContext(GameContext)

  useKeyboardBindings()

  useEffect(() => {
    onStartGame()

    ReactGA4.event({
      category: "actions",
      action: "game:start",
    });
  }, [settings?.mode])

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
      {/* s={{ alignItems: 'flex-end', flexDirection: 'column' }} */}
      {/* <Select
        options={Object.keys(GAME_MODES).map((key: string) => ({ label: capitalize(key), value: key }))}
        onChange={(key: string) => setSettings({ ...settings, mode: GAME_MODES[key], key })}
      /> */}
      <Container s={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Spacer size="l" s={{ pb: 'm', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Timer />
          <Button onClick={onStartGame} isOutline>
            { gameOver && !gameOver?.won ? <FrownIcon size={18} /> : <SmileIcon size={18} /> }
          </Button>
          <Text s={{ textAlign: 'center' }}>{ remainingBlocks }</Text>
        </Spacer>
        <Map />
      </Container>
      { gameOver?.won && (
        <Popup
          actions={[
            <Button onClick={onStartGame}>Restart</Button>
          ]}
        >
          <Text s={{ width: '100%', textAlign: 'center' }}>
            You won! Click restart to play again.
          </Text>
        </Popup>
      ) }
    </Wrapper>
  )
}

export default PlayView
