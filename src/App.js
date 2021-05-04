import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Dashboard from "./components/Dashboard"

function App() {
  return(
    <Router>

      <Switch>
        <Route exact path="/:page?/:range?">
          <Dashboard />
        </Route>
        <Route path="/">
          <h1>404: Page not found</h1>
        </Route>
      </Switch>
      
    </Router>
  )  
}

export default App;
