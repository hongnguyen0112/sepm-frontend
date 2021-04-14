import Hourly from './component/Hourly';
import Daily from './component/Daily';
import React from 'react'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Navbar from './component/Navbar'
import Current from "./component/Current";
import './index.css'

function App() {
    return (
        <div className = "web">
          <Router>
            <Navbar/>
            <br/>
            <Switch>
              <Route exact path="/" component={Current} />
              <Route exact path="/hourly" component={Hourly} />
              <Route exact path="/daily" component={Daily} />
            </Switch>
          </Router>
        </div>
    )
}

export default App
