import styled from '@emotion/styled'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Providers, Redirect } from './components'
import { useDimensions } from './hooks'

const FlexWrapper = styled.div`
  height: ${({ height }) => `${height}px`};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const App = () => {
  const { height } = useDimensions()
  return (
    <Router>
      <Providers>
        <Switch>
          <FlexWrapper height={height}>
            <Route path="/:url">
              <Redirect />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </FlexWrapper>
        </Switch>
      </Providers>
    </Router>
  )
}

export default App
