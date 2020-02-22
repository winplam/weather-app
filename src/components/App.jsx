import React from 'react'
import Input from './Input'
import Message from './Message'
import Report from './Report'
import { fetchData, fetchIPLookup } from '../modules/FetchAPI'
import { formatReport } from '../modules/FormatReport'
import '../scss/style.scss'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      forecastTable: [],
      weatherReport: [],
      city: this.getCityFromStorage(),
      // imperial or metric
      units: this.getUnits(),
      message: '',
      showLoader: false,
    }
    this.loadData(this.state.city, this.state.units)
  }

  // Initialize today's weather report with current data from API
  async createReport (city, units) {
    const result = await fetchData(city, 'weather', units)
    this.setState({ weatherReport: formatReport(result, units) })
  }

  // Initialize 5 day weather forecast with current data from API
  async createForecast (city, units) {
    const result = await fetchData(city, 'forecast', units)
    this.setState({ forecastTable: result })
  }

  getCityFromStorage () {
    let lastSavedInput = JSON.parse(localStorage.getItem('last-input'))
    try {
      if (lastSavedInput[0]) return lastSavedInput[0]
    } catch (e) {return false}
  }

  getUnits = () => {
    let lastSavedInput = JSON.parse(localStorage.getItem('last-input'))
    try {
      if (lastSavedInput[1]) return lastSavedInput[1]
    } catch (e) {
      return 'imperial'
    }
  }

  // Get city from IP location lookup
  ipLookup = async () => {
    this.updateMessage('Looking up local weather', 1000, true)
    const result = await fetchIPLookup()
    if (result.status === 'success') {
      const city = `${result.city}, ${result.countryCode}`
      this.setState({ city: city })
      this.loadData(this.state.city, this.state.units)
    } else {
      this.updateMessage('IP location lookup error: ' + result, 3000)
    }
  }

  // Load report and forecast
  loadData = (city, units) => {
    this.createReport(city, units)
    this.createForecast(city, units)
  }

  // Change units between "imperial" (F) or "metric" (C)
  toggleUnits = () => {
    if (this.state.units === 'metric') {
      this.setState({ units: 'imperial' })
      this.loadData(this.state.city, 'imperial')
    } else {
      this.setState({ units: 'metric' })
      this.loadData(this.state.city, 'metric')
    }
  }

  // Update weather display with selected city
  updateCity = city => {
    if (city) {
      this.updateMessage('Looking up weather for ' + city, 1000, true)
    } else {
      this.updateMessage('Looking up weather', 1, true)
    }
    this.setState({ city: city })
  }

  // Update 5 day weather forecast after user submits new city input
  updateForecast = forecast => {
    this.setState({ forecastTable: forecast })
  }

  // Show alert or warning message
  updateMessage = (message, milliseconds, showLoader) => {
    this.setState({ message: message, showLoader: showLoader })
    setTimeout(() => {this.setState({ message: '', showLoader: false })}, milliseconds)
  }

  // Update today's weather report after user submits new city input
  updateReport = report => {
    this.setState({ weatherReport: report })
  }

  render () {
    // Show static parts of the page while today's weather report is loading
    if (this.state.weatherReport.length === 0) {
      return (
        <div>
          <Input updateReport={this.updateReport}/>
          <div>Loading...</div>
        </div>
      )
    } else {
      return (
        <div className="app">
          <Input
            city={this.state.city}
            units={this.state.units}
            updateCity={this.updateCity}
            updateForecast={this.updateForecast}
            updateMessage={this.updateMessage}
            updateReport={this.updateReport}
          />
          <Message message={this.state.message} showLoader={this.state.showLoader}/>
          <Report
            forecastTable={this.state.forecastTable}
            ipLookup={this.ipLookup}
            toggleUnits={this.toggleUnits}
            units={this.state.units}
            weatherReport={this.state.weatherReport}
          />
        </div>
      )
    }
  }
}
