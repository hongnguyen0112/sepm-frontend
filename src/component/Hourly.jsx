//Import libraries
import React, { useState, useEffect } from 'react'
import { Button, Modal, Card, Row, Col, Table, Tabs, Tab } from 'react-bootstrap'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import axios from 'axios'
import { Link } from "react-router-dom";
//Import icons
import beanie from "../assesst/beanie.png"
import hat from "../assesst/hat.png"
import sunglasses from "../assesst/sunglasses.png"
import earmuffs from "../assesst/earmuffs.png"
import mask from "../assesst/mask.png"
import scarf from "../assesst/scarf.png"
import thick_jacket from "../assesst/thick jacket.png"
import sweater from "../assesst/sweater.png"
import thin_jacket from "../assesst/thin jacket.png"
import long_sleeves from "../assesst/long sleeves.png"
import thermal_underwear from "../assesst/thermal underwear.png"
import gloves from "../assesst/gloves.png"
import winter_boots from "../assesst/winter boots.png"
import umbrella from "../assesst/umbrella.png"
import raincoat from "../assesst/raincoat.png"



function Hourly({ weather, address, lat, lon }) {
    const [value, onChange] = useState(['01:00', '23:00']);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [outfit, setOutfit] = useState([]);

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

    useEffect(()=>{
        axios
            .get(`http://127.0.0.1:5000/predict?lat=${lat}&lon=${lon}`)
            .then(res=> {
                console.log(res)
                setOutfit(res.data[0])
            })
            .catch(err=>{
                console.log(err)
            })
    // eslint-disable-next-line
    }, [address])

    var current_outfit = outfit
    const outfit_list_size = 15

    //outfit recommendation array
    var recommendation = []
    const recommendation_size = 6
    var recommendation_index = 0

    //List of outfit
    var imgArray = []
    imgArray[0] = beanie
    imgArray[1] = hat
    imgArray[2] = sunglasses
    imgArray[3] = earmuffs
    imgArray[4] = mask
    imgArray[5] = scarf
    imgArray[6] = thick_jacket
    imgArray[7] = sweater
    imgArray[8] = thin_jacket
    imgArray[9] = long_sleeves
    imgArray[10] = thermal_underwear
    imgArray[11] = gloves
    imgArray[12] = winter_boots
    imgArray[13] = umbrella
    imgArray[14] = raincoat

    //Function to put outfit into recommendation array 
    const getOutfit = () => {
        //Scan ml array
        for (var i = 0; i < outfit_list_size; i++) {
            //If value 1, add outfit with according index to recommendation array
            if (current_outfit[i] === 1) {
                recommendation[recommendation_index] = imgArray[i]
                recommendation_index++
            }
            //Limit reached, break
            if (recommendation_index === recommendation_size) {
                break
            }
        }
        return recommendation
    }

    recommendation = getOutfit()
    console.log(recommendation)

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
                            <h2>Outfit</h2>
                            <div className = "content">
                                <Row style = {{marginTop: "5px", marginBottom: "5px"}} className="content"> 
                                {recommendation.map((recommendation,index)=>
                                    <div className = "col-sm-4" key={index}>
                                        <img src={recommendation} className="icon" alt = "outfit icon"/>                    
                                    </div>
                                )}
                                </Row>
                            </div>
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