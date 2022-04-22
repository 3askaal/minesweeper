import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga4'
import { ThemeProvider, GlobalStyle, theme } from '3oilerplate'
import { GameProvider } from '../context'
import { PlayView } from '../views'
import { LocalGlobalStyle, localTheme } from '../style'
import { SApp } from './App.styled'
import deepmerge from 'deepmerge'

export const history = createBrowserHistory()

ReactGA.initialize('G-TCXYFCYL83')

const App = () => {
  return (
    <ThemeProvider theme={deepmerge(theme, localTheme, { arrayMerge: (srcArray, overrideArray) => overrideArray })}>
      <SApp>
        <GlobalStyle />
        <LocalGlobalStyle />
        <Router history={history}>
          <Switch>
            <GameProvider>
              <Route exact path="/">
                <PlayView />
              </Route>
            </GameProvider>
          </Switch>
        </Router>
      </SApp>
    </ThemeProvider>
  )
}

export default App
