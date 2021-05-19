import Hourly from './component/Hourly';
import Daily from './component/Daily';
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from './component/Navbar'
import Current from "./component/Current";
import Footer from './component/Footer'
import './index.css'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

//API key
const api = {
  key: "2bf14f2db250719b59f4c8cc5eb9eb9c",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [coordinates, setCoordinates] = useState({
    lat: 10.8231,
    lng: 106.6297
  });
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("Ho Chi Minh City, Vietnam");

  //async/await function to get the data from Google Maps API
  const handleSelect = async value => {
    const results = await geocodeByAddress(value); //Get geocode by address
    const latLng = await getLatLng(results[0]); //Get latitude and longtitude values
    setLocation(value); //Set the location to the value
    setCoordinates(latLng); //Set latitude and longtitude
  };

  //Fetch weather data
  const fetchData = () => {
    fetch(`${api.base}onecall?lat=10.8231&lon=106.6297&exclude=minutely&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(json => {
        setWeather(json); //Set data of JSON file to weather
      });
  }

  const componentDidMount = () => {
    fetchData()
  }

  //Search function
  const search = evt => {
    if(location.trim().length === 0){
      return;
    }
    //Declare the url
    const url = `${api.base}onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=minutely&units=metric&appid=${api.key}`
    //Fetching the API
    fetch(url)
      .then(res => res.json()) 
      .then(json => {
        setWeather(json); //Set data of JSON file to weather
        setLocation("");  //Set location to null
        setAddress(location)  //Set address
      });
    //Test the URL
  }

  return (
    <div className="container-fluid" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
      {(typeof weather.lat != 'undefined' && typeof weather.lon != 'undefined') ? (
        <div style={{ backgroundColor: "#3aa7dd" }}>
          <Router>
            <div className="container-fluid">
              <div className="row" >
                <div className="col-1" >
                  <br />
                    {/* Navbrand */}
                    <Link to='/' className="navbar-brand" style={{ marginLeft: '20px', fontFamily: 'Bad Script', fontWeight: 'bold', color: 'white', fontSize: '25px' }}>
                      WOR
                    </Link>
                </div>
                
                {/* Search bar */}
                <div className="col-11"><br />
                  <div className="input-group mb-3 justify-content-center">
                    <PlacesAutocomplete value={location} onChange={setLocation} onSelect={handleSelect}>
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                          <div>
                            <input
                              style={{ width: '1000px' }}
                              {...getInputProps({ placeholder: "Search for location..." })}
                              className="form-control"
                            />
                          </div>
                          <div className="autocomplete-dropdown-container">
                            {loading ? <div>...loading</div> : null}
                            {suggestions.map(suggestion => {
                              const style = { backgroundColor: suggestion.active ? "#41b6e6" : "#fff" };
                              return (
                                <div >
                                  <div {...getSuggestionItemProps(suggestion, { style })} className="recommendations" style={{ width: '1000px', backgroundColor: 'white' }}>
                                    {suggestion.description}
                                  </div>
                                </div>);
                            })}
                          </div>
                        </div>)}
                    </PlacesAutocomplete>
                    <div className="input-group-append">
                      <button className="btn btn-success" type="button" id="button-addon2" onClick={search}>
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                 </div>
              </div>
            </div>
            
            {/* web page */}
            <div className="web container-fluid" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
              <Navbar />
              <br />
              <Switch>
                <Route exact path="/"> <Current weather={weather} address={address} lat = {coordinates.lat} lon = {coordinates.lng}/> </Route>
                <Route exact path="/hourly"><Hourly weather={weather} address={address} lat = {coordinates.lat} lon = {coordinates.lng}></Hourly></Route>
                <Route exact path="/daily"><Daily weather={weather} address={address}></Daily></Route>
              </Switch>
              <Footer />
            </div>
          </Router>
        </div>
      ) : (<div>{componentDidMount()}</div>)}


    </div>
  )
}

export default App;
