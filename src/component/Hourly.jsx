//Import libraries
import React, {useState} from 'react'
import {Button, Modal, Card, Row, Col} from 'react-bootstrap'
import { format } from "date-fns";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'; 
import { endOfToday, set } from 'date-fns' 
import TimeRange from 'react-timeline-range-slider'  
//API set up
// const api = {
//     key: "2bf14f2db250719b59f4c8cc5eb9eb9c",
//     base: "https://api.openweathermap.org/data/2.5/" 
// }



function Hourly( {weather, address, hourly}) {
    const now = new Date()
const getTodayAtSpecificHour = (hour = 0) =>
	set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const selectedStart =  getTodayAtSpecificHour(0)
const selectedEnd =  getTodayAtSpecificHour(1)

const startTime =  getTodayAtSpecificHour()
const endTime =  endOfToday()

    const error =() =>(false)
    const selectedInterval = [selectedStart,selectedEnd] 
    const errorHandler = () => ({ error })  
    const onChangeCallback = (selectedInterval) => ({selectedInterval} )

    const [value, onChange] = useState(['00:00', '12:00']);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const convert = (unix) => {
    //     const date = new Date(unix * 1000);
    //     const hour = date.getUTCHours();
    //     const time = date.toUTCString()
    //     return time;
    // }
    const convert = (unix) => {
        const date = new Date(unix * 1000);
        const utc_time = date.toUTCString()
        const time = utc_time.slice(-25, -7)
        return time;
    }
    
    const converthhmm = (unix) => {
        const date = new Date(unix * 1000);
        const hour = date.getUTCHours();
        const minute = date.getUTCMinutes();
        const formattedDate = hour + " : " + minute;
        return formattedDate;
    }
    const convertMMdd = (unix) => {
        const date = new Date(unix * 1000);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const month = months[date.getMonth()];
        const day = date.getDate();
        const formattedDate = month + " " + day;
        return formattedDate;
    }

    return (
        <div>
            <h1>This is hourly page</h1>
            {address}
    
            <div>
            {!weather.alerts ? ('') : (
                    <div className="container">
                        <Card className="text-center" style={{ color: "white", width: "400px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#cf615f" }}>
                            <Card.Body>
                                <Card.Title>Weather Alert</Card.Title>
                                <Card.Text>{weather.alerts.map(alert => (
                                    <div>{alert.event}</div>
                                ))}</Card.Text>
                                <Button variant="primary" onClick={handleShow}>Read More</Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>National Alerts</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {weather.alerts.map((a, index) => (
                                            <div key={index}>
                                                <div role="tabpanel">
                                                    <ul className="nav nav-tabs" role="tablist">
                                                        <li role="presentation" className="active"><a href={a.event} aria-controls="uploadTab" role="tab" data-toggle="tab">{a.event}</a>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content">
                                                        <div role="tabpanel" className="tab-pane active" id={a.event}>
                                                            Location: {address} <br />
                                                            Alert: {weather.alerts.map(alert => (

                                                            <div>
                                                                Sender Name: {alert.sender_name} <br />
                                                                    Start: {convert(alert.start)} <br />
                                                                    End: {convert(alert.end)} <br />
                                                                    Description: {alert.description} <br />
                                                            </div>
                                                        ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                        </Card.Body>
                        
                    </Card>
                    
                </div>)}
                <Row>
                <div className="container">
                    {/* <div className="info">
                        <span>Selected Interval: </span>
                        {selectedInterval.map((d, i) => (
                            <span key={i}>{format(d, "dd MMM, HH:mm")}</span>
                        ))}
                    </div> */}
                    <TimeRange
                        ticksNumber={36}  
                        selectedInterval = {selectedInterval}
                        timelineInterval={[startTime, endTime]}  
                        onUpdateCallback={errorHandler}  
                        onChangeCallback={onChangeCallback}  
                    />
                </div>
                <div>
                    {console.log(weather)}
                </div>

                </Row>
                <h2>Weather Info</h2>

                <Row>
                    

                    <div className = "col">
                        <div className = "outfit-box">
                            <h2>Recommendation</h2>
                        </div>
                    </div>
                </Row>
                
                <Row>
                    <div className = "detail-box">
                        <h2>Details</h2>
                        <br/>
                        <Row>
                            <div>
                                    <TimeRangePicker
                                onChange={onChange}
                                value= {value}
                                disableClock= 'true'
                                />
                               
                            </div>
                        </Row>
                        <Row>
                            <hr/>
                                <Row>
                                    {weather.hourly.filter(data => (value[0] <= converthhmm(data.dt) && converthhmm(data.dt) <= value[1])).map((data, index) => (
                                    <div key={index}>
                                        <Row>
                                            <Col><p>{convert(data.dt * 1 + weather.timezone_offset * 1)}</p></Col>
                                            <Col><p>Temperatures: {data.temp.toFixed(0)}°C</p></Col>              
                                            <Col><p>Humidity: {data.humidity} %</p></Col>                                                                                                                                                           
                                            <Col><p> Wind speed: {data.wind_speed.toFixed(0) * 3.6} km/h</p></Col>   
                                            <Col><p> UV index: {data.uvi}</p></Col>
                                            {/* <Col><p>{hourly.weather}</p></Col> */}
                                            <hr/>
                                        </Row>
                                    </div>
                                ))}
                                </Row>
                        </Row>
                    </div>
                </Row>
                
            </div>        

            
        </div>
    );
}
export default Hourly;