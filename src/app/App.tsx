import React from 'react'
import { SocketIOProvider } from "use-socketio";
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga4'
import { ThemeProvider, GlobalStyle, theme } from '3oilerplate'
import { GameProvider, SocketProvider } from '../context'
import { HomeView, PlayView } from '../views'
import { LocalGlobalStyle, localTheme } from '../style'
import { SApp } from './App.styled'
import { SOCKET_URL } from '../constants';
import deepmerge from 'deepmerge'

export const history = createBrowserHistory()

ReactGA.initialize('G-40XGVJPSNY')

const App = () => {
  return (
    <ThemeProvider theme={deepmerge(theme, localTheme, { arrayMerge: (srcArray, overrideArray) => overrideArray })}>
      <SApp>
        <GlobalStyle />
        <LocalGlobalStyle />
        <Router history={history}>
          <SocketIOProvider url={SOCKET_URL} opts={{ autoConnect: false }}>
            <Switch>
              <GameProvider>
                <SocketProvider>
                  <Route exact path="/">
                    <PlayView />
                  </Route>
                </SocketProvider>
              </GameProvider>
            </Switch>
          </SocketIOProvider>
        </Router>
      </SApp>
    </ThemeProvider>
  )
}

export default App
