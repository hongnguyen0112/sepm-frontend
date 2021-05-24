//Import libraries
import React, { useState } from 'react'
import { Button, Modal, Card, ListGroup, ListGroupItem, Row, Tabs, Tab, Table } from 'react-bootstrap'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Daily = ({ weather, address }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "black" }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SampleNextArrow />,
    };

    // Convert unix to "full date with time"
    const convert = (unix) => {
        const date = new Date(unix * 1000);
        const utc_time = date.toUTCString()
        const time = utc_time.slice(-25, -7)
        return time;
    }

    // Convert unix to "month and day"
    const convertMMdd = (unix) => {
        const date = new Date(unix * 1000);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const month = months[date.getMonth()];
        const day = date.getDate();
        const formattedDate = month + " " + day;
        return formattedDate;
    }

    // Convert unix to "Hour and Minutes"
    const converthhmm = (unix) => {
        const date = new Date(unix * 1000);
        const hour = date.getUTCHours();
        const minute = date.getUTCMinutes();
        const formattedDate = hour + " : " + minute;
        return formattedDate;
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
                                                                    Start: {convert(alert.start * 1 + weather.timezone_offset * 1)} <br />
                                                                    End: {convert(alert.end * 1, weather.timezone_offset * 1)} <br />
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
                <div className="dailybox">
                    <h1>{address}</h1><br />

                    <Slider {...settings}>

                        {/* Loop function */}
                        {weather.daily.map((mapdaily, index) => (
                            <div className='col-xl-8' key={index}>

                                {/* Tab starts */}
                                <Tabs defaultActiveKey="simple" id="uncontrolled-tab-example">

                                    <Tab eventKey="simple" title="Simple">
                                        {/* Card starts */}
                                        <Card style={{ width: '24rem'}}>
                                            <Card.Img variant="top" style={{ height: "150px", width: "150px" }} src={`http://openweathermap.org/img/w/${mapdaily.weather[0].icon}.png`} />
                                            <Card.Body>
                                                <Card.Title>{convertMMdd(mapdaily.dt * 1 + weather.timezone_offset * 1)}</Card.Title>
                                                <Card.Text>{mapdaily.weather[0].description}</Card.Text>
                                                <Card.Text>
                                                    <Table striped bordered hover>
                                                        <thead>
                                                            <tr>
                                                                <th> Morning </th>
                                                                <th> Day </th>
                                                                <th> Evening </th>
                                                                <th> Night </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td> {mapdaily.temp.morn} °C </td>
                                                                <td> {mapdaily.temp.day} °C </td>
                                                                <td> {mapdaily.temp.eve} °C </td>
                                                                <td> {mapdaily.temp.night} °C </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Card.Text>
                                                <Card.Text>
                                                    Minimum Temperature: <span style = {{float: "right"}}> {mapdaily.temp.min} °C </span><br/>
                                                    Maximum Temperature: <span style = {{float: "right"}}> {mapdaily.temp.max} °C </span>
                                                </Card.Text>
                                            </Card.Body>
                                            <ListGroup className="list-group-flush">
                                                <ListGroupItem>Rain: <span style = {{float: "right"}}> {(mapdaily.pop * 100).toFixed(0)} % </span></ListGroupItem>
                                                <ListGroupItem>Humidity: <span style = {{float: "right"}}> {mapdaily.humidity} % </span></ListGroupItem>
                                                <ListGroupItem>Wind speed: <span style = {{float: "right"}}> {mapdaily.wind_speed.toFixed(0) * 3.6} km/h </span></ListGroupItem>
                                            </ListGroup>
                                        </Card>
                                    </Tab>

                                    <Tab eventKey="temp" title="Temp">
                                        <Card style={{ width: '24rem' }}>
                                            <Card.Img variant="top" style={{ height: "150px", width: "150px" }} src={`http://openweathermap.org/img/w/${mapdaily.weather[0].icon}.png`} />
                                            <Card.Body>
                                                <Card.Title>{convertMMdd(mapdaily.dt * 1 + weather.timezone_offset * 1)}</Card.Title>
                                                <Card.Text>
                                                    Sunrise time: <span style = {{float: "right"}}> {converthhmm(mapdaily.sunrise * 1 + weather.timezone_offset * 1)} </span><br/>
                                                    Sunset time: <span style = {{float: "right"}}> {converthhmm(mapdaily.sunset * 1 + weather.timezone_offset * 1)} </span><br/><br/>

                                                    <Row><h5>Temperature</h5></Row>
                                                    <Table striped bordered hover>
                                                        <thead>
                                                            <tr>
                                                                <th> Morning </th>
                                                                <th> Day </th>
                                                                <th> Evening </th>
                                                                <th> Night </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td> {mapdaily.temp.morn} °C </td>
                                                                <td> {mapdaily.temp.day} °C </td>
                                                                <td> {mapdaily.temp.eve} °C </td>
                                                                <td> {mapdaily.temp.night} °C </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>

                                                    Minimum Temperature: <span style = {{float: "right"}}> {mapdaily.temp.min} °C </span><br/>
                                                    Maximum Temperature: <span style = {{float: "right"}}> {mapdaily.temp.max} °C </span><br/><br/>

                                                    <Row><h5>Temperature feels like</h5></Row>
                                                    <Table striped bordered hover>
                                                        <thead>
                                                            <tr>
                                                                <th> Morning </th>
                                                                <th> Day </th>
                                                                <th> Evening </th>
                                                                <th> Night </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td> {mapdaily.feels_like.morn} °C </td>
                                                                <td> {mapdaily.feels_like.day} °C </td>
                                                                <td> {mapdaily.feels_like.eve} °C </td>
                                                                <td> {mapdaily.feels_like.night} °C </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>

                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Tab>

                                    <Tab eventKey="detail" title="Detail">
                                        <Card style={{ width: '24rem' }}>
                                            <Card.Img variant="top" style={{ height: "150px", width: "150px" }} src={`http://openweathermap.org/img/w/${mapdaily.weather[0].icon}.png`} />
                                            <Card.Body>
                                                <Card.Title>{convertMMdd(mapdaily.dt * 1 + weather.timezone_offset * 1)}</Card.Title>
                                                <Card.Text>
                                                    Sea level pressure: <span style = {{float: "right"}}> {mapdaily.pressure} hPa </span><br/><br/>
                                                    Humidity: <span style = {{float: "right"}}> {mapdaily.humidity} % </span><br/><br/>
                                                    Atmospheric temperature: <span style = {{float: "right"}}> {mapdaily.dew_point} °C </span><br/><br/>
                                                    Wind speed: <span style = {{float: "right"}}> {mapdaily.wind_speed.toFixed(0) * 3.6} km/h </span><br/>
                                                    Wind gust: <span style = {{float: "right"}}> {mapdaily.wind_gust.toFixed(0) * 3.6} km/h </span><br/>
                                                    Wind direction: <span style = {{float: "right"}}> {convertWindDirection(mapdaily.wind_deg)} </span><br/><br/>
                                                    Cloudiness: <span style = {{float: "right"}}> {mapdaily.clouds} % </span><br/><br/>
                                                    UV index: <span style = {{float: "right"}}> {mapdaily.uvi} {convertUVIndex(mapdaily.uvi)} </span><br/><br/>
                                                    Rain: <span style = {{float: "right"}}> {mapdaily.pop * 100}%, {mapdaily.rain}mm </span><br/><br/>
                                                    Snow: <span style = {{float: "right"}}> {mapdaily.snow} mm </span>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Tab>
                                </Tabs>
                            </div>
                        ))}
                    </Slider>
                </div>

            </div >
        </div >
    );
}
export default Daily;