import React, { useContext, useEffect } from 'react'
import { Container, Wrapper, Box, Popup, Button, Text } from '3oilerplate'
import ReactGA from 'react-ga4'
import { PlayerDetails, Map } from '../../components'
import { GameContext } from '../../context'
import ReactGA4 from 'react-ga4'
import faker from 'faker'
import { Timer } from '../../components/Timer/Timer'
import { useKeyboardBindings } from '../../helpers/keyboard'
import { useHistory, useLocation } from 'react-router-dom'

const PlayView = () => {
  const search = useLocation().search;
  const history = useHistory()
  const {
    socket,
    players,
    remainingTime,
    onStartGame,
    blocks,
    onGameMove,
    onGameBomb,
    settings,
    setPlayers,
    gameOver,
    getWinner,
    getMe,
  } = useContext(GameContext)

  useKeyboardBindings()

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/play" });

    const debug = new URLSearchParams(search).get('debug');

    if (debug) {
      setPlayers([{ name: faker.name.firstName(), x: 0, y: 0 }, { name: faker.name.firstName(), x: 0, y: 0 }])
      onStartGame()
    }

    if (!players.length) {
      history.push('/setup')
    }
  }, [])

  useEffect(() => {
    if (gameOver()) {
      ReactGA4.event({
        category: "actions",
        action: "game:over",
        label: `${players?.map(({ name }: any) => name).join(' vs. ')}. ${!remainingTime ? 'Time limit reached.' : `Winner: ${getWinner().name}`}`,
      });
    }
  }, [players])

  return (
    <Wrapper s={{ padding: ['xs', 'xs', 's'] }}>
      <Container s={{ alignItems: 'center' }}>
        <Box
          s={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            alignContent: (settings.type === 'online' && 'flex-end') || 'space-between',
            flexDirection: 'row',
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          { settings.type === 'local' && players?.map((player: any, playerIndex: number) => (
            <Box
              key={`player${playerIndex}`}
              s={{
                display: 'inline-flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <PlayerDetails
                onMove={(direction: string, movement: number) => onGameMove({ playerIndex, direction, movement })}
                player={player}
                onBomb={() => onGameBomb({ playerIndex })}
              />
            </Box>
          )) }
          { settings.type === 'online' && (
            <Box
              s={{
                display: 'inline-flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <PlayerDetails
                onMove={(direction: string, movement: number) => onGameMove({ playerIndex: getMe().index, direction, movement })}
                player={getMe()}
                onBomb={() => onGameBomb({ playerIndex: getMe().index })}
              />
            </Box>
          ) }
        </Box>
        <Box s={{ flexGrow: 1, height: '100%', flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <Box s={{ position: 'relative' }}>
            <Timer s={{ pb: 's', transform: 'translateY(-100%)', position: 'absolute' }} />
            <Map blocks={blocks} />
          </Box>
        </Box>
      </Container>
      { gameOver() && (
        <Popup
          actions={[
            <Button onClick={() => onStartGame({}, false)}>Restart</Button>
          ]}
        >
          <Text s={{ textAlign: 'center' }}>{
            remainingTime ?
              `${getWinner().name} won!` :
              `Time limit reached!`
          } Click restart to start over!</Text>
        </Popup>
      ) }
    </Wrapper>
  )
}

export default PlayView
