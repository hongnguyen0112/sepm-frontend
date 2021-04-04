//Import libraries
import React, {useState} from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

//API set up
const api = {
    key: "2bf14f2db250719b59f4c8cc5eb9eb9c",
    base: "https://api.openweathermap.org/data/2.5/"
}

function Weather() {
    //Create hook for weather and setWeather function
    const [weather, setWeather] = useState({});
    //Create hook for location and setLocation function
    const [location, setLocation] = useState("");
    //Create hook for coordinates which combines 2 elements (lat and lng values) and setCoordinates function
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });

    //Search event (fetching the weather data from API)
    const search = evt =>{
        //Declare the url as a constant value
        const url = `${api.base}onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&units=metric&appid=${api.key}`
        //Fetching the API
        fetch(url)
        .then(res=> res.json()) //Format the result to JSON
        .then(json => {
          setWeather(json); //Set data of JSON file to weather
          setLocation(""); //Set location to null
          setCoordinates({ //Set coordinates value to null after searching
              lat: null,
              lng: null
          });
          
        });
        //Test the URL
        console.log(url)
    }

    //async/await function to get the data from Google Maps API
    const handleSelect = async value => {
        const results = await geocodeByAddress(value); //Get geocode by address
        const latLng = await getLatLng(results[0]); //Get latitude and longtitude values
        setLocation(value); //Set the location to the value
        setCoordinates(latLng); //Set latitude and longtitude
    };

    // const dateBuilder = (d) =>{
    //   let months = ["Jan", "Feb", "Mar", "Arpil", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"];
    //   let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    //   let day = days[d.getDay()];
    //   let date = d.getDate();
    //   let month = months[d.getMonth()];
    //   let year = d.getFullYear();
  
    //   return `${day} ${date} ${month} ${year}`
    // }
    return (
        <div>
            <PlacesAutocomplete
                value={location}
                onChange={setLocation}
                onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: "Search for location..." })} /> 
            <div>
              {loading ? <div>...loading</div> : null} 
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description};
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <button onClick = {search}>Search</button>
      {(typeof weather.lat != 'undefined' && typeof weather.lon!='undefined')?(
            <div>
                <h2>Weather Info</h2>
                {weather.current.temp}
            </div>
        ):('')}
        </div>
    );
}
export default Weather;