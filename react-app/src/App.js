import React from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherContainer from "./components/WeatherContainer/WeatherContainer";
import ForecastContainer from "./components/ForecastContainer/ForecastContainer";
import './stylesheet.css';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <WeatherContainer />
      <ForecastContainer />
    </div>
  );
}

export default App;
