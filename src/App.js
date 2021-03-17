import React, {useState} from 'react';

const api = {
  key: "d6bc2a170a5fb5defecdd7a58d1eedd7",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=> res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      });
    }
  }
  const dateBuilder = (d) =>{
    let months = ["Jan", "Feb", "Mar", "Arpil", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") 
    ? ((weather.main.temp > 16) 
    ? 'app': 'app rain') : 'app'}>
      <main>
        <div className = "search-box">
          <input type = "text" 
          className = "search-bar" 
          placeholder = "Search for your country..."
          onChange={e=>setQuery(e.target.value)}
          value ={query}
          onKeyPress = {search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className = "location-box">
              <div className = "location">{weather.name}, {weather.sys.country}</div>
              <div className = "date">{dateBuilder(new Date())}</div>
            </div>
            <div className = "weather-box">
              <div className = "temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className = "weather">{weather.weather[0].main}</div>
            </div>
          </div>  
        ): ('')}
      </main>
    </div>
  );
}

export default App;
