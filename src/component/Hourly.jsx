//Import libraries
import React, { useState } from 'react'
import { Button, Modal, Card } from 'react-bootstrap'


function Hourly({ weather, address }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const convert = (unix) => {
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
                                                    <ul class="nav nav-tabs" role="tablist">
                                                        <li role="presentation" class="active"><a href={a.event} aria-controls="uploadTab" role="tab" data-toggle="tab">{a.event}</a>
                                                        </li>
                                                    </ul>
                                                    <div class="tab-content">
                                                        <div role="tabpanel" class="tab-pane active" id={a.event}>
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
                <div>Your location: {address}</div>
                {weather.current.temp}

            </div>
        </div>
    );
}
export default Hourly;