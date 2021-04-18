//Import libraries
import React, {useState} from 'react'
import {Button, Modal, Card, Row, Col, Table} from 'react-bootstrap'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'; 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
// import umbrella from './assesst/umbrella.png'


function Hourly({weather, address}) {
    const [value, onChange] = useState(['01:00','23:00']);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const convert = (unix) => {
        const date = new Date(unix * 1000);
        const utc_time = date.toUTCString()
        const time = utc_time.slice(-12,-7)
        return time;
    }
    const convertDate = (unix) => {
        const date = new Date(unix * 1000);
        const utc_time = date.toUTCString()
        const time = utc_time.slice(-25,-7)
        return time;
    }
    const compare = (time) => {
        var today = new Date()
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let datetime = date + " " +time
        let unix  = (Date.parse(datetime)/1000).toFixed(0)
        {console.log(`${date}${time}`)}
        {console.log(datetime)}
        {console.log("Unix: " + {unix})}
        return unix;
    }
        
    // const converthhmm = (unix) => {
    //     const date = new Date(unix * 1000);
    //     const hour = date.getUTCHours();
    //     const minute = date.getUTCMinutes();
    //     const formattedDate = (hour + " : " + minute);
    //     return formattedDate;
    // }
   

      

    
    return (
        <div>

            
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
                <h2>Weather Info</h2>
                <div className = "weather-box">
                            
                            <Row className = "details">
                                <h2 style = {{textAlign: "justify"}}>Location: {address}</h2> 
                                <Col >
                                                                
                                    <h2 className = "temp">{weather.current.temp.toFixed(0)}°C</h2>
                                    <p>Feels like: {weather.current.feels_like.toFixed(0)}°C</p>
                                    <p>Humidity: {weather.current.humidity}%</p>
                                    <p>UV Index: {weather.current.uvi}</p>
                                </Col>
                                <Col style = {{textAlign: "left", verticalAlign: "middle", height: "100%"}}>
                                    <img style = {{height:"300px", width: "300px"} } 
                                    src={`http://openweathermap.org/img/w/${weather.current.weather[0].icon}.png`} 
                                    alt=""/>
                                </Col>
                            </Row>
                            <Row style = {{paddingLeft: "0.5%"}}>
                                <p>Updated: {convertDate(weather.current.dt + weather.timezone_offset *1)}</p>
                            </Row>
                        </div>  <br/>                                              
                <Row>                   
                    <div className = "col">
                        <div className = "outfit-box">
                            <h2>Recommendation</h2>
                            <img style = {{height:"300px", width: "300px"} } 
                                    src="umbrella.png"
                                    alt = "umbrella"/>
                           <img style = {{height:"300px", width: "300px"} } 
                                    src="sunglasses.jpg"
                                    alt = "sunglasses"/>      
                            <img style = {{height:"300px", width: "300px"} } 
                                    src="cap.png"
                                    alt = "cap"/>
                            <img style = {{height:"300px", width: "300px"} } 
                                    src="hoodiejacket.png"
                                    alt = "hoodie"/>                                    
                        </div>
                    </div>
                </Row>
                
                
                <Row>
                    <div className = "detail-box">
                        <h2>Details</h2>
                        <br/>
                        
                        <hr/>
                        <Row>
                            <Col><b>Time selection</b></Col>
                           <Col><div>
                                    <TimeRangePicker 
                                onChange={onChange}
                                value= {value}
                                disableClock= 'true'
                                />                              
                            </div></Col>
                            <Col></Col>
                         
                        </Row>
                        <Row>
                            <hr/>
                                <Row>                                
                                    <div >
                                        <Table> 
                                            <thead>
                                                <tr>
                                                    <th><b>Time</b></th>
                                                    <th><b>Temperatures</b></th>
                                                    <th><b>Humidity</b></th>
                                                    <th><b>Rain probability</b></th>
                                                    <th><b>UV Index</b></th>
                                                </tr>
                                            </thead>
                                                {weather.hourly.filter(data => (compare(value[0]) <= data.dt && data.dt <= compare(value[1]))).map((data, index)=> (
                                            <tbody key = {index}>
                                                <tr     data-toggle="collapse"
                                                        data-target=".multi-collapse1"
                                                        aria-controls="multiCollapseExample1">
                                                                                                                
                                                            <td>{convertDate(data.dt + weather.timezone_offset *1)}</td>
                                                            <td>{data.temp.toFixed(0)}°C</td>
                                                            <td>{data.humidity} %</td>
                                                            <td>{data.pop} % </td>
                                                            <td>{data.uvi}</td>
                                                        
                                               </tr>
                                                
                                                <tr class="collapse multi-collapse1" id="multiCollapseExample1"> 
                                                
                                                    <b>
                                                    
                                                        <td>Wind speed: {data.wind_speed.toFixed(0) * 3.6} km/h </td>
                                                        <td>Pressure:  {data.pressure} hPa</td>
                                                        <td>Dew point: {data.dew_point.toFixed(0)}°C</td>
                                                        <td>Visibility: {data.visibility/1000} km</td>
                                                        <td>Cloudiness: {data.clouds} % </td>
                                                        <td>Wind gust: {data.wind_gust.toFixed(0) *3.6} km/h</td>

                                                    </b>
                                                </tr>                                                                                                                                                                          
                                            
                                            </tbody> 
                                            ))}
                                            
                                        </Table>
                                    </div>
                                
                                </Row>
                        </Row>
                    </div>
                </Row>
                
            </div>        

            
        </div>
    );
}
export default Hourly;