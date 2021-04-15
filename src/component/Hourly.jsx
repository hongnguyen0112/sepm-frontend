//Import libraries
import React, {useState} from 'react'
import {Button, Modal, Card} from 'react-bootstrap'


function Hourly({weather, address}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <h1>This is hourly page</h1>
            {address}
           
            <div>
                {!weather.alerts? (''):(
                    <div className="container">
                    <Card className="text-center" style={{color: "white",width:"400px", marginLeft:"auto", marginRight: "auto", backgroundColor:"#cf615f"}}>
                        <Card.Body>
                            <Card.Title>Weather Alert</Card.Title>
                            <Card.Text>{weather.alerts.map(alert=>(
                                <div>{alert.event}</div>
                            ))}</Card.Text>
                           <Button variant="primary" onClick={handleShow}>Read More</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>National Alerts</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Location: {address} <br/>
                            Alert: {weather.alerts.map(alert=>(
                                <li>
                                <div>
                                    Sender Name: {alert.sender_name} <br/>
                                    Start: {alert.start} <br/>
                                    End: {alert.end} <br/>
                                    Description: {alert.description} <br/>
                                </div>
                                </li>
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