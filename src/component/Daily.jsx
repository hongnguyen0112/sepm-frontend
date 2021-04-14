//Import libraries
import React, { useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Button, Modal, Card, ListGroup, ListGroupItem, Row } from 'react-bootstrap'

//API set up
const api = {
    key: "2bf14f2db250719b59f4c8cc5eb9eb9c",
    base: "https://api.openweathermap.org/data/2.5/"
}

function Daily() {
    //Create hook for weather and setWeather function
    const [weather, setWeather] = useState({});
    //Create hook for location and setLocation function
    const [location, setLocation] = useState("");
    //Create hook for coordinates which combines 2 elements (lat and lng values) and setCoordinates function
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });

    const [address, setAddress] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Search event (fetching the weather data from API)
    const search = evt => {
        //Declare the url as a constant value
        const url = `${api.base}onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=minutely&units=metric&appid=${api.key}`
        //Fetching the API
        fetch(url)
            .then(res => res.json()) //Format the result to JSON
            .then(json => {
                setWeather(json); //Set data of JSON file to weather
                console.log(json);
                setLocation(""); //Set location to null
                setCoordinates({
                    lat: null,
                    lng: null
                })
            });
        //Test the URL
        console.log(url)
    }

    const fetchData = () => {
        fetch(`${api.base}onecall?lat=21.028511&lon=105.804817&exclude=minutely&units=metric&appid=${api.key}`)
            .then(res => res.json())
            .then(json => {
                setWeather(json); //Set data of JSON file to weather
                console.log(json);
                setLocation(""); //Set location to null
                setCoordinates({
                    lat: null,
                    lng: null
                })
            });
    }

    const componentDidMount = () => {
        fetchData();
    }

    //async/await function to get the data from Google Maps API
    const handleSelect = async value => {
        const results = await geocodeByAddress(value); //Get geocode by address
        const latLng = await getLatLng(results[0]); //Get latitude and longtitude values
        setLocation(value); //Set the location to the value
        setAddress(value);
        setCoordinates(latLng); //Set latitude and longtitude
    };

    // Convert unix to time
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
            <div class="input-group mb-3 justify-content-center">
                <PlacesAutocomplete value={location} onChange={setLocation} onSelect={handleSelect}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <div>
                                <input style={{ width: '1000px' }} {...getInputProps({ placeholder: "Search for location..." })} className="form-control" />
                            </div>
                            <div className="autocomplete-dropdown-container">
                                {loading ? <div>...loading</div> : null}
                                {suggestions.map(suggestion => {
                                    const style = { backgroundColor: suggestion.active ? "#41b6e6" : "#fff" };
                                    return (
                                        <div {...getSuggestionItemProps(suggestion, { style })} className="recommdations" style={{ width: '1000px', backgroundColor: 'white' }}>
                                            {suggestion.description}
                                        </div>);
                                })}
                            </div>
                        </div>)}
                </PlacesAutocomplete>

                <div class="input-group-append">
                    <button class="btn btn-success" type="button" id="button-addon2" onClick={search}>
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>

            {(typeof weather.lat != 'undefined' && typeof weather.lon != 'undefined') ? (
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
                                            Location: {address} <br />
                                            Alert: {weather.alerts.map(alert => (
                                            <li>
                                                <div>
                                                    Sender Name: {alert.sender_name} <br />
                                                    Start: {alert.start} <br />
                                                    End: {alert.end} <br />
                                                    Description: {alert.description} <br />
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

                    {/* Card for weather information starts */}
                    <div>Your location: {address}</div>
                    {weather.daily.map((mapdaily) => (
                        <Card style={{ width: '18rem' }}>
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
                    ))}
                    {/* Card for weather information ends */}

                </div>) : (<div>{componentDidMount()}</div>)}
        </div>
    );
}
export default Daily;