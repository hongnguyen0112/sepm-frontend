//Import libraries
import React, { useState } from 'react'
import { Button, Modal, Card } from 'react-bootstrap'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';


function Hourly({ weather, address }) {
    
    const [value, onChange] = useState(['10:00', '11:00']);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // Convert unix to time
    const convert = (unix) => {
        const date = new Date((unix) * 1000);
        const utc_time = date.toUTCString()
        const time = utc_time.slice(-25, -7)
        return time;
    }

    const converthhmm = (unix) => {
        const date = new Date(unix * 1000);
        const hour = date.getUTCHours();
        const minute = date.getUTCMinutes(10);
        const formattedDate = hour + " : " + minute;
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
                <h2>Weather Info</h2>
                <div>
                    {console.log(weather)}

                    <div>
                        <div>
                            <TimeRangePicker
                                onChange={onChange}
                                value= {value}
                                disableClock= 'true'
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {weather.hourly.filter(data => (value[0] <= converthhmm(data.dt) && converthhmm(data.dt) <= value[1])).map((data, index) => (
                        <div key={index}>
                            {converthhmm(data.dt)}
                            {data.weather.map(weather=>(
                                weather.main
                            )
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
export default Hourly;