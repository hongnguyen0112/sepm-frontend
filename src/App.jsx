import Hourly from './Hourly';
import Daily from './Daily';
import React from 'react'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Navbar from './Navbar'
import Current from "./Current";

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    }
  }
  
  render(){
      return(
        <Router>
          <Navbar/>
          <br/>
          <Switch>
            <Route exact path="/" component={Current} />
            <Route exact path="/hourly" component={Hourly} />
            <Route exact path="/daily" component={Daily} />
          </Switch>
        </Router>
      )
  }
}

