import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import Home from './components/Home';
import Redirect from './components/Redirect'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:url">
          <Redirect />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
