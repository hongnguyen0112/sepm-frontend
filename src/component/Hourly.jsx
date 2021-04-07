//Import libraries
import React, {useState} from 'react'
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from "react-places-autocomplete";

//API set up
const api = {
    key: "2bf14f2db250719b59f4c8cc5eb9eb9c",
    base: "https://api.openweathermap.org/data/2.5/"
}

function Hourly() {
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
            <div class="input-group mb-3 justify-content-center">
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
                <div class="input-group-append">
                    <button class="btn btn-success" type="button" id="button-addon2" onClick = {search}>
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <h1>This is hourly page</h1>
            {(typeof weather.lat != 'undefined' && typeof weather.lon!='undefined')?(
            <div>
                <h2>Weather Info</h2>
                <div>Your location: {address}</div>
                {weather.current.temp}
            </div>):(<div>{componentDidMount()}</div>)}
            
        </div>
    );
}
export default Hourly;