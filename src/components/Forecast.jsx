import React from 'react'

export default function Forecast ({ forecast }) {
  const day = forecast.day
  const noonTemp = forecast.noonTemp
  const degreeUnit = forecast.degreeUnit
  const weatherDescription = forecast.weatherDescription
  const weatherIcon = forecast.weatherIcon

  return (
    <div className="forecast">
      <div className="forecast-header">
        <div>{day}</div>
      </div>
      <div className="forecast-content">
        <div className="forecast-icon">
          <img src={`images/icons/${weatherIcon}`} alt={weatherDescription} width="48"/>
        </div>
        <div className="degree">{noonTemp}<sup>o</sup>{degreeUnit}</div>
      </div>
    </div>
  )
}
