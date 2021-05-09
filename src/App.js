import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Dashboard from "./components/Dashboard"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './App.css'
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette:{
    primary:{
      main: "#1F2937",
      light: "#E4E4E7"
    },
    secondary:{
      main: "#4B5563",
      light:"#F4F5F7"
    },
    success:{
      main:"#03543F",
      light: "#DEF7EC",
    },
    error:{
      main: "#981B1C",
      light: "#FDE2E1"
    },
    warning:{
      main: "#92400F",
      light: "#FEF3C7"
    }
  }
})

function App() {
  return(
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
    
  )  
}

export default App;
