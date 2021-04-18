//Import libraries
import React, { useState } from 'react'
import { Button, Modal, Card, Row, Col, Table, Tabs, Tab } from 'react-bootstrap'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';




function Hourly({ weather, address }) {
    const [value, onChange] = useState(['01:00', '23:00']);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const convert = (unix) => {
        const date = new Date(unix * 1000);
        const utc_time = date.toUTCString()
        const time = utc_time.slice(-12, -7)
        return time;
    }
    const convertDate = (unix) => {
        const date = new Date(unix * 1000);
        const utc_time = date.toUTCString()
        const time = utc_time.slice(-25, -7)
        return time;
    }
    const todaycompare = (time) => {
        var today = new Date()
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let datetime = date + " " + time
        let unix = (Date.parse(datetime) / 1000).toFixed(0)
        return unix;
    }

    const tmrcompare = (time) => {
        var today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const date = tomorrow.getFullYear() + '-' + (tomorrow.getMonth() + 1) + '-' + tomorrow.getDate();
        let datetime = date + " " + time
        let unix = (Date.parse(datetime) / 1000).toFixed(0)
        return unix;
    }

    const [key, setKey] = useState('today');

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

                <Row>


                    <div className="col">
                        <div className="outfit-box">
                            <h2>Recommendation</h2>
                        </div>
                    </div>
                </Row>

                <Row>
                    <div className="detail-box">
                        <h2>Details</h2>
                        <br />

                        <hr />
                        <Row>
                            <Col><b>Time selection</b></Col>
                            <Col><div>
                                <TimeRangePicker
                                    onChange={onChange}
                                    value={value}
                                    clearIcon = {null}
                                    disableClock='true'
                                    
                                />

                            </div></Col>
                        </Row>
                        <Row>
                            <br />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                            >
                                <Tab eventKey="today" title="Today">
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
                                                {weather.hourly.filter(data => (todaycompare(value[0]) <= data.dt && data.dt <= todaycompare(value[1]))).map((data, index) => (
                                                    <tbody key={index}>
                                                        <tr data-toggle="collapse"
                                                            data-target=".multi-collapse1"
                                                            aria-controls="multiCollapseExample1">

                                                            <td>{convertDate(data.dt + weather.timezone_offset * 1)}</td>
                                                            <td>{data.temp.toFixed(0)}°C</td>
                                                            <td>{data.humidity} %</td>
                                                            <td>{data.pop} % </td>
                                                            <td>{data.uvi}</td>
                                                        </tr>
                                                        <tr class="collapse multi-collapse1" id="multiCollapseExample1"> <b>
                                                            <td>Wind speed: {data.wind_speed.toFixed(0) * 3.6} km/h </td>
                                                            <td>Pressure:  {data.pressure} hPa</td>
                                                            <td>Dew point: {data.dew_point.toFixed(0)}°C</td>
                                                            <td>Visibility: {data.visibility / 1000} km</td>
                                                            <td>Cloudiness: {data.clouds} % </td>
                                                            <td>Wind gust: {data.wind_gust.toFixed(0) * 3.6} km/h</td>
                                                        </b>
                                                        </tr>
                                                    </tbody>
                                                ))}
                                            </Table>
                                        </div>
                                    </Row>
                                </Tab>
                                <Tab eventKey="tomorrow" title="Tomorrow">
                                    <div>
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
                                                    {weather.hourly.filter(data => (tmrcompare(value[0]) <= data.dt && data.dt <= tmrcompare(value[1]))).map((data, index) => (
                                                        <tbody key={index}>
                                                            <tr data-toggle="collapse"
                                                                data-target=".multi-collapse1"
                                                                aria-controls="multiCollapseExample1">

                                                                <td>{convertDate(data.dt + weather.timezone_offset * 1)}</td>
                                                                <td>{data.temp.toFixed(0)}°C</td>
                                                                <td>{data.humidity} %</td>
                                                                <td>{data.pop} % </td>
                                                                <td>{data.uvi}</td>

                                                            </tr>

                                                            <tr class="collapse multi-collapse1" id="multiCollapseExample1"> <b>

                                                                <td>Wind speed: {data.wind_speed.toFixed(0) * 3.6} km/h </td>
                                                                <td>Pressure:  {data.pressure} hPa</td>
                                                                <td>Dew point: {data.dew_point.toFixed(0)}°C</td>
                                                                <td>Visibility: {data.visibility / 1000} km</td>
                                                                <td>Cloudiness: {data.clouds} % </td>
                                                                <td>Wind gust: {data.wind_gust.toFixed(0) * 3.6} km/h</td>
                                                            </b>
                                                            </tr>
                                                        </tbody>
                                                    ))}
                                                </Table>
                                            </div>
                                        </Row>
                                    </div>
                                </Tab>

                            </Tabs>
                            <hr />

                        </Row>
                    </div>
                </Row>

            </div>


        </div>
    );
}
export default Hourly;