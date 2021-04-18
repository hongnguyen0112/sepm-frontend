//Import libraries
import React, {useState} from 'react'
import {Button, Modal, Card, Row, Col} from 'react-bootstrap'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'; 





function Hourly({weather, address}) {


    const [value, onChange] = useState(['00:00','23:00']);

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
        let unix  = Date.parse(datetime)/1000
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
                                  {weather.hourly.filter(data => (compare(value[0]) <= data.dt && data.dt <= compare(value[1]))).map((data, index)=> (
                                    <div key={index}
                                    >
                                        <Row>                                   
                                            <Col><p>{convertDate(data.dt + weather.timezone_offset *1)}</p></Col>
                                            <Col><p>Temperatures: {data.temp.toFixed(0)}°C</p></Col>              
                                            <Col><p>Humidity: {data.humidity} %</p></Col>                                                                                                                                                           
                                            <Col><p> Wind speed: {data.wind_speed.toFixed(0) * 3.6} km/h</p></Col>   
                                            <Col><p> UV index: {data.uvi}</p></Col>                                                       
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