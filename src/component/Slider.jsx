import React from 'react'  
import { endOfToday, set } from 'date-fns' 
import { format } from "date-fns";
import TimeRange from 'react-timeline-range-slider'  

const now = new Date()
const getTodayAtSpecificHour = (hour = 0) =>
	set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const selectedStart =  getTodayAtSpecificHour(0)
const selectedEnd =  getTodayAtSpecificHour(1)

const startTime =  getTodayAtSpecificHour()
const endTime =  endOfToday()

function Slider() {  
  // state = {  
  //   error: false,  
  //   selectedInterval: [selectedStart, selectedEnd],  
  // }
	
  // errorHandler = ({ error }) => this.setState({ error })  

  // onChangeCallback = selectedInterval => this.setState({ selectedInterval })  

  // render() {  
  //   const { selectedInterval, error } = this.state  
  const error =() => error (false)
  const selectedInterval = [selectedStart,selectedEnd] 
  const errorHandler = () => ({ error })  
  const onChangeCallback = () => (selectedInterval ) 
      return (  
        <div className="container">
        <div className="info">
          <span>Selected Interval: </span>
          {selectedInterval.map((d, i) => (
            <span key={i}>{format(d, "dd MMM, HH:mm")}</span>
          ))}
        </div>
        <TimeRange
          ticksNumber={36}  

          selectedInterval = {selectedInterval}
          timelineInterval={[startTime, endTime]}  
          onUpdateCallback={errorHandler}  
          onChangeCallback={onChangeCallback}  
        />
        </div>
      )  
  }    

export default Slider;