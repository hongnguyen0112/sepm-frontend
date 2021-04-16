//Import libraries
import Slider from './Slider'
import React, {useState} from 'react'
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from "react-places-autocomplete"; 
import {Button, Modal, Card, Row, Col} from 'react-bootstrap'
import { format } from "date-fns";
import { render } from 'react-dom/cjs/react-dom.development';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'; 
//API set up
const api = {
    key: "2bf14f2db250719b59f4c8cc5eb9eb9c",
    base: "https://api.openweathermap.org/data/2.5/"
}

function Hourly() {
    const [value, onChange] = useState(['00:00', '23:59']);
    
      //Create hook for weather and setWeather function
    const [weather, setWeather] = useState({});
    //Create hook for location and setLocation function
    const [location, setLocation] = useState("");
    //Create hook for coordinates which combines 2 elements (lat and lng values) and setCoordinates function
    const [coordinates, setCoordinates] = 
    
    useState({
        lat: null,
        lng: null
    });
    const [address, setAddress] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const fetchData = () =>{
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

    const componentDidMount = () =>  {
        fetchData();
    }
    //Search event (fetching the weather data from API)
    const search = evt =>{
        //Declare the url as a constant value
        const url = `${api.base}onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=minutely&units=metric&appid=${api.key}`
        //Fetching the API
        fetch(url)
        .then(res=> res.json()) //Format the result to JSON
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
    

    //async/await function to get the data from Google Maps API
    const handleSelect = async value => {
        const results = await geocodeByAddress(value); //Get geocode by address
        const latLng = await getLatLng(results[0]); //Get latitude and longtitude values
        setLocation(value); //Set the location to the value
        setAddress(value);
        setCoordinates(latLng); //Set latitude and longtitude
    };
    const convert = (unix) => {
        const date = new Date(unix * 1000);
        const time = date.toUTCString()
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
            <div className="input-group mb-3 justify-content-center">
                <PlacesAutocomplete value={location} onChange={setLocation}  onSelect={handleSelect}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <div>
                                <input style={{width:'1000px'}} {...getInputProps({ placeholder: "Search for location..." })} className="form-control"/> 
                            </div>
                            <div className = "autocomplete-dropdown-container">
                                {loading ? <div>...loading</div> : null} 
                                {suggestions.map(suggestion => {
                                const style = { backgroundColor: suggestion.active ? "#41b6e6" : "#fff"};
                                return (
                                    <div {...getSuggestionItemProps(suggestion, { style })} className = "recommdations" style={{width: '1000px', backgroundColor: 'white'}}>
                                        {suggestion.description}
                                    </div>);
                                })}
                            </div>
                        </div>)}
                    </PlacesAutocomplete>
               
                <div className="input-group-append">
                    <button className="btn btn-success" type="button" id="button-addon2" onClick = {search}>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            
            <h1>This is hourly page</h1>
            
            {(typeof weather.lat != 'undefined' && typeof weather.lon!='undefined')?(
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
                <Row>
                <Slider>
                
                </Slider>
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

                </Row>
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
                                <hr/>
                                <Row>{weather.hourly.map(hourly=>(
                                    <div>
                                        <Row>
                                            <Col><p>{convert(hourly.dt)}</p></Col>
                                            <Col><p>Temperatures: {hourly.temp.toFixed(0)}°C</p></Col>              
                                            <Col><p>Humidity: {hourly.humidity} %</p></Col>                                                                                                                                                           
                                            <Col><p> Wind speed: {hourly.wind_speed.toFixed(0) * 3.6} km/h</p></Col>   
                                            <Col><p> UV index: {hourly.uvi}</p></Col>
                                            {/* <Col><p>{hourly.weather}</p></Col> */}
                                            <hr/>
                                        </Row>
                                    </div>
                                ))}</Row>
                        </Row>
                    </div>
                </Row>
                <div>Your location: {weather.address}</div>
                {weather.current.temp}
            </div>):(<div>{componentDidMount()}</div>)}
            
        </div>
    );
}
export default Hourly;