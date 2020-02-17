import React from 'react'

export default function Today ({ weatherToday }) {
  return (
    <div className="forecast-content">
      <div className="location">{weatherToday.city}, {weatherToday.country}</div>
      <div className="degree">
        <div className="num">
          {weatherToday.degree}<sup>o</sup>{weatherToday.degreeUnit}</div>
        <div className="forecast-icon">
          <img src={`images/icons/${weatherToday.weatherIcon}`}
               alt={weatherToday.weatherDescription} width="90"/>
        </div>
      </div>
      <span><img src="images/icon-umberella.png"
                 alt="Cloudiness umbrella"/>{weatherToday.cloudiness}%</span>
      <span><img src="images/icon-wind.png"
                 alt="Wind speed icon"/>{weatherToday.windSpeed} {weatherToday.windUnits}</span>
      <span><img src="images/icon-compass.png"
                 alt="Wind direction compass"/>{weatherToday.windDirection}</span>
    </div>
  )
}