//Import libraries
import React, { useState } from 'react'
import { Button, Modal, Card, ListGroup, ListGroupItem, Row } from 'react-bootstrap'

const Daily = ({ weather, address }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Convert unix to time
    // Convert unix to time
    const convert = (unix) => {
        const date = new Date((unix) * 1000);
        const utc_time = date.toUTCString()
        const time = utc_time.slice(-25, -7)
        return time;
    }

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

                {/* Card for weather information starts */}
                <div className="container">
                    <div>Your location: {address}</div>
                    <Row>
                        {weather.daily.map((mapdaily, index) => (
                            <div className='col-xl-3' key={index}>

                                <Card style={{ width: '16rem' }}>
                                    <Card.Img variant="top" style={{ height: "150px", width: "150px" }} src={`http://openweathermap.org/img/w/${mapdaily.weather[0].icon}.png`} />
                                    <Card.Body>
                                        <Card.Title>{convert(mapdaily.dt)}</Card.Title>
                                        <Card.Text>{mapdaily.weather[0].description}</Card.Text>
                                        <Card.Text>
                                            <Row>Morning: {mapdaily.temp.morn}</Row>
                                            <Row>Day: {mapdaily.temp.day}</Row>
                                            <Row>Evening: {mapdaily.temp.eve}</Row>
                                            <Row>Night: {mapdaily.temp.night}</Row>
                                        </Card.Text>
                                        <Card.Text>
                                            <Row>Minimum Temperature: {mapdaily.temp.min}</Row>
                                            <Row>Maximum Temperature: {mapdaily.temp.max}</Row>
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Rain: {mapdaily.rain}</ListGroupItem>
                                        <ListGroupItem>Humidity: {mapdaily.humidity}</ListGroupItem>
                                        <ListGroupItem>Wind speed: {mapdaily.wind_speed}</ListGroupItem>
                                    </ListGroup>
                                </Card>
                                <br />
                            </div>
                        ))}
                    </Row>
                    {/* Card for weather information ends */}
                </div>

            </div>
        </div>
    );
}
export default Daily;