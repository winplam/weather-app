import React from 'react'
import { fetchData } from '../modules/FetchAPI'
import { formatReport } from '../modules/FormatReport'
import { csv } from 'd3'

const Suggestions = require('suggestions')

export default class Input extends React.Component {
  constructor (props) {
    super(props)
    this.state = { city: '' }
  }

  componentDidMount () {
    this.getCities()
  }

  handleChange = event => {
    this.setState({ city: event.target.value })
  }

  getCities = () => {
    csv('./data/world-cities.csv').then(cityData => {this.suggestCities(cityData)})
  }

  // Get today's weather report from API. And call method to get 5 day forecast
  handleSubmit = event => {
    event.preventDefault()
    const inputBox = document.querySelector('input')
    const city = inputBox.value
    this.props.updateCity(city)
    fetchData(city, 'weather', this.props.units).then(response => {
      try {
        if (response.cod === 200) {
          const report = formatReport(response, this.props.units)
          this.props.updateReport(report)
          this.fetchForecast(city)
        }
      } catch (error) {
        console.error(error)
        this.props.updateMessage('City not found: ' + city, 3)
      }
    })
    inputBox.value = ''
  }

  // Get 5 day weather forecast from API
  fetchForecast = (city) => {
    fetchData(city, 'forecast', this.props.units).then(response => {
      this.props.updateForecast(response)
    })
  }

  suggestCities = (data) => {
    const input = document.querySelector('input')
    new Suggestions(input, data, {
      minLength: 1,
      limit: 10,
      render: header => `${header.name}, ${header.country}`,
      getItemValue: header => `${header.name}, ${header.country}`,
    })
  }

  render () {
    const backgroundImg = 'images/unsplash.jpg'
    return (
      <div className="find-container" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className="container">
          <form className="find-location" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Find your city..." autoComplete="off" onChange={this.handleChange}/>
            <input type="submit"/>
          </form>
        </div>
      </div>
    )
  }
}
