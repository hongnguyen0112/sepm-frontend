//Import libraries
import React, { useState } from 'react'
import { Button, Modal, Card, Row, Col } from 'react-bootstrap'


const Current = ({ weather, address }) => {

    
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

    //Convert unix time for sunset and sunrise display
    const convertRiseSet = (unix) => {
        const date = new Date((unix) * 1000);
        const utc_time = date.toUTCString()
        const time = utc_time.slice(-12, -7)
        return time;
    }

    // Convert wind direction to user friendly format
    const convertWindDirection = (degree) => {
        const directions = ['North/NE', 'NE', 'East/NE', 'East', 'East/SE', 'SE', 'South/SE', 'South', 'South/SW', 'SW', 'West/SW', 'West', 'West/NW', 'NW', 'North/NW', 'North'];
        const new_degree = parseInt((degree - 11.25) / 22.5);
        const direction = directions[new_degree];
        return direction;
    }


    // Convert UV Index to risk of harm
    const convertUVIndex = (uvi) => {
        if (uvi <= 2) {
            return "Low";
        } else if (uvi <= 5) {
            return "Moderate";
        } else if (uvi <= 7) {
            return "High";
        } else if (uvi <= 10) {
            return "Very High";
        } else {
            return "Extreme";
        };
    }


    return (
        <div>
            <div className="web-container">
                {/* Weather alerts */}
                {!weather.alerts ? (
                    '') : (
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
                    </div>
                )}
                <br />

                {/* Main report container */}
                <Row>
                    <Col>
                        <div className="weather-box">
                            <Row>
                                <h1>{address}</h1>
                                <br />
                            </Row>
                            <Row className="details">
                                <Col>
                                    <h2 className="temp">{weather.current.temp.toFixed(0)}°C</h2>
                                    <p style = {{fontWeight: "bold"}}>{weather.current.weather[0].main}</p>
                                    <p>Feels like: {weather.current.feels_like.toFixed(0)}°C</p>
                                    <p>Humidity: {weather.current.humidity}%</p>
                                    <p>UV Index: {weather.current.uvi.toFixed(0)} {convertUVIndex(weather.current.uvi)}</p>
                                </Col>
                                <Col className = "icon">
                                    <img style={{ height: "150px", width: "150px"}}
                                        src={`http://openweathermap.org/img/w/${weather.current.weather[0].icon}.png`}
                                        alt="" 
                                    />
                                </Col>
                            </Row>
                            <Row style={{ paddingLeft: "0.5%" }}>
                                <p>Updated: {convert(weather.current.dt * 1 + weather.timezone_offset * 1)}</p>
                            </Row>
                        </div>
                    </Col>

                    <div className="col">
                        <div className="outfit-box">
                            <h2>Outfit</h2>
                            <div className = "content">
                                <Row style = {{marginTop: "5px", marginBottom: "5px", paddingLeft: "50px"}}>
                                    <img style={{ height: "150px", width: "150px"}}
                                                src={`https://png.pngtree.com/png-clipart/20190118/ourlarge/pngtree-baseball-cap-hand-drawn-hand-account-book-cartoon-png-image_458138.jpg`}
                                                alt="Cap" 
                                    />
                                    <img style={{ height: "150px", width: "150px"}}
                                                src={`https://png.pngtree.com/png-clipart/20190520/original/pngtree-down-jacket-coat-coat-hairy-png-image_3893118.jpg`}
                                                alt="Cap" 
                                    />
                                     <img style={{ height: "150px", width: "150px"}}
                                                src={`https://png.pngtree.com/png-clipart/20190920/original/pngtree-sunglasses-cartoon-png-image_4633566.jpg`}
                                                alt="Cap" 
                                    />
                                </Row>
                                <Row style = {{marginTop: "5px", marginBottom: "5px", paddingLeft: "50px"}}>
                                    <img style={{ height: "150px", width: "150px"}}
                                                    src={`https://png.pngtree.com/png-clipart/20190118/ourlarge/pngtree-baseball-cap-hand-drawn-hand-account-book-cartoon-png-image_458138.jpg`}
                                                    alt="Cap" 
                                    />
                                    <img style={{ height: "150px", width: "150px"}}
                                                src={`https://png.pngtree.com/png-clipart/20190520/original/pngtree-down-jacket-coat-coat-hairy-png-image_3893118.jpg`}
                                                alt="Cap" 
                                    />
                                    <img style={{ height: "150px", width: "150px"}}
                                                src={`https://png.pngtree.com/png-clipart/20190920/original/pngtree-sunglasses-cartoon-png-image_4633566.jpg`}
                                                alt="Cap" 
                                    />
                                </Row>
                            </div>
                        </div>
                    </div>
                </Row>

                <Row>
                    <div className="detail-box">
                        <h2>Details</h2>
                        <br />
                        <Row>
                            <Col>
                                <p>Wind: <span style = {{float: "right"}}>{weather.current.wind_speed.toFixed(0) * 3.6} km/h {convertWindDirection(weather.current.wind_deg)}</span></p>
                                <hr/>
                                <p>Wind Gusts: <span style = {{float: "right"}}>{weather.current.gust * 3.6} km/h</span></p>
                                <hr/>
                                <p>Dew Point: <span style = {{float: "right"}}>{weather.current.dew_point.toFixed(0)}°C</span></p>
                                <hr/>
                                <p>Sunrise: <span style = {{float: "right"}}>{convertRiseSet(weather.current.sunrise * 1 + weather.timezone_offset * 1)}</span></p>
                                <hr/>
                            </Col>
                            <Col>
                                <p>Pressure: <span style = {{float: "right"}}>{weather.current.pressure} hPa</span></p>
                                <hr />
                                <p>Cloud Cover: <span style = {{float: "right"}}>{weather.current.clouds}%</span></p>
                                <hr />
                                <p>Visibility: <span style = {{float: "right"}}>{weather.current.visibility / 1000} km</span></p>
                                <hr />
                                <p>Sunset: <span style = {{float: "right"}}>{convertRiseSet(weather.current.sunset * 1 + weather.timezone_offset * 1)}</span></p>
                                <hr/>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </div>
        </div>
    );
}
export default Current;