import React from 'react'
import Forecast from './Forecast'
import Today from './Today'
import { formatForecast } from '../modules/FormatForecast'

export default function Report (props) {
  const date = props.weatherReport.date
  const day = props.weatherReport.day
  const weatherToday = {
    city: props.weatherReport.city,
    cloudiness: props.weatherReport.cloudiness,
    country: props.weatherReport.country,
    degree: props.weatherReport.degree,
    degreeUnit: props.weatherReport.degreeUnit,
    weatherDescription: props.weatherReport.weatherDescription,
    weatherIcon: props.weatherReport.weatherIcon,
    windDirection: props.weatherReport.windDirection,
    windSpeed: props.weatherReport.windSpeed,
    windUnits: props.weatherReport.windUnits,
  }

  // Show current day's weather while the 5 day forecast is loading
  if (props.forecastTable.length === 0) {
    return (
      <div className="forecast-table">
        <div className="container">
          <div className="forecast-container">
            <div className="today forecast">
              <div className="forecast-header">
                <div className="day">{day}, {date}</div>
                <div className="date">
                  <button type="button" onClick={props.toggleUnits}>clickMe</button>
                </div>
              </div>
              <Today weatherToday={weatherToday}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="forecast-table">
      <div className="container">
        <div className="forecast-container">
          <div className="today forecast">
            <div className="forecast-header">
              <div className="day">{day}, {date}</div>
              <div className="date">
                <button type="button" onClick={props.ipLookup}>Local Weather</button>
                <button type="button" onClick={props.toggleUnits}>C° / F°</button>
              </div>
            </div>
            <Today weatherToday={weatherToday}/>
            <Forecast forecast={formatForecast(props.forecastTable, 0, props.units)}/>
            <Forecast forecast={formatForecast(props.forecastTable, 1, props.units)}/>
            <Forecast forecast={formatForecast(props.forecastTable, 2, props.units)}/>
            <Forecast forecast={formatForecast(props.forecastTable, 3, props.units)}/>
            <Forecast forecast={formatForecast(props.forecastTable, 4, props.units)}/>
          </div>
        </div>
      </div>
    </div>
  )
}
