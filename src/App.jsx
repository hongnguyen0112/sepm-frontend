import Hourly from './component/Hourly';
import Daily from './component/Daily';

import React from 'react'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Navbar from './component/Navbar'
import Current from "./component/Current";
import './index.css'
import TimeRange from 'react-timeline-range-slider'
import { endOfToday, set } from 'date-fns' 

const now = new Date()
const getTodayAtSpecificHour = (hour = 12) =>
	set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const selectedStart = getTodayAtSpecificHour()
const selectedEnd = getTodayAtSpecificHour(14)

const startTime = getTodayAtSpecificHour(7)
const endTime = endOfToday()

// const disabledIntervals = [
//   { start: getTodayAtSpecificHour(16), end: getTodayAtSpecificHour(17) },
//   { start: getTodayAtSpecificHour(7), end: getTodayAtSpecificHour(12) },
//   { start: getTodayAtSpecificHour(20), end: getTodayAtSpecificHour(24) }
// ]
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = {  
    error: false,  
    selectedInterval: [selectedStart, selectedEnd],  
  }
  errorHandler = ({ error }) => this.setState({ error })  

  onChangeCallback = selectedInterval => this.setState({ selectedInterval })  
  
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    }
  }
  
  render(){
    const { selectedInterval, error } = this.state  
      return(
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
          <TimeRange
          error={error}  
          ticksNumber={70}  
          selectedInterval={selectedInterval}  
          timelineInterval={[startTime, endTime]}  
          onUpdateCallback={this.errorHandler}  
          onChangeCallback={this.onChangeCallback}
          // disabledIntervals={disabledIntervals}  
        />
        </div>
        
      )
  }
}

