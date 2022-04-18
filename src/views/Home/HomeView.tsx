import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Wrapper, Spacer, Button, Title } from '3oilerplate'

const HomeView = () => {
  const history = useHistory()

  return (
    <Wrapper>
      <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Spacer size="l" style={{ alignItems: 'center' }}>
          <Title level={1}>Minesweeper</Title>
          <Spacer size="m" style={{ alignItems: 'center' }}>
            <Button onClick={() => history.push('/setup')}>Start Game</Button>
          </Spacer>
        </Spacer>
      </Container>
    </Wrapper>
  )
}

export default HomeView
