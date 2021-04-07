//Import libraries
import React, {useState} from 'react'
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from "react-places-autocomplete";
import {Button, Modal} from 'react-bootstrap'
//API set up
const api = {
    key: "2bf14f2db250719b59f4c8cc5eb9eb9c",
    base: "https://api.openweathermap.org/data/2.5/"
}

function Current() {
    //Create hook for weather and setWeather function
    const [weather, setWeather] = useState({});
    //Create hook for location and setLocation function
    const [location, setLocation] = useState("");
    //Create hook for coordinates which combines 2 elements (lat and lng values) and setCoordinates function
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });
    const [show, setShow] = useState(false);
    const [address, setAddress] = useState("");
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

    return (
        <div>
            <div className="input-group mb-3 justify-content-center">
                <PlacesAutocomplete value={location} onChange={setLocation} onSelect={handleSelect}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <div>
                                <input style={{width:'1000px'}} {...getInputProps({ placeholder: "Search for location..." })} className="form-control"/> 
                            </div>
                            <div className = "autocomplete-dropdown-container">
                                {loading ? <div>...loading</div> : null} 
                                {suggestions.map(suggestion => {
                                const style = { backgroundColor: suggestion.active ? "#41b6e6" : "#fff" };
                                return (
                                    <div >
                                        <div {...getSuggestionItemProps(suggestion, { style })} className="recommendations" style={{width: '1000px', backgroundColor: 'white'}}>
                                            {suggestion.description}
                                        </div> 
                                    </div>);
                                })}
                            </div>
                        </div>)}
                    </PlacesAutocomplete>
                <div>
                     
                </div>
                <div className="input-group-append">
                    <button className="btn btn-success" type="button" id="button-addon2" onClick = {search}>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            {(typeof weather.lat != 'undefined' && typeof weather.lon!='undefined')?(
            <div className="web-container">
                {!weather.alerts? (
                    <div className = "container-fluid">
                        <div className = "no-alerts-box">
                            There is no alert found
                        </div>
                    </div>):(
                    <div className="container">
                        <Button variant="primary" onClick={handleShow}>View Details</Button>
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
                    </div>
                )}
                <div className = "row">
                    <div className = "col">
                        <div className = "weather-box">
                            <div className = "row">
                            <h1>{address}</h1>
                         <br/>
                        <div>
                            <div className = "row">
                                <div className = "col-md-3">
                                    <h2>{weather.current.temp}°C</h2>
                                </div>
                                <div className = "col-md-3">
                                    <img style = {{height:"150px", width: "150px"} } src={`http://openweathermap.org/img/w/${weather.current.weather[0].icon}.png`} alt=""/>
                                </div>
                            </div>
                        </div>
                    
                   
                            </div>
                        </div>
                    </div>

                    <div className = "col">
                        <div className = "outfit-box">
                            <h1>Outfit</h1>
                        </div>
                    </div>
                    

                </div>
                
                <div className = "row">
                    <div className = "detail-box">
                        <h1>Details</h1>
                    </div>
                </div>
            </div>):<div>{componentDidMount()}</div>}
        </div>
    );
}
export default Current;