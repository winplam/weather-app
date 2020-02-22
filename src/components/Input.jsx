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

  getCities = async () => {
    const response = await csv('./data/world-cities.csv')
    this.suggestCities(response)
  }

  // Get today's weather report from API. And call method to get 5 day forecast
  handleSubmit = async event => {
    event.preventDefault()
    const inputBox = document.querySelector('input')
    const city = inputBox.value
    if (city === '') {
      this.props.updateMessage('Please enter a city', 3000)
      return
    }
    this.props.updateCity(city)
    const response = await fetchData(city, 'weather', this.props.units)
    try {
      if (response.cod === 200) {
        const report = formatReport(response, this.props.units)
        this.props.updateReport(report)
        this.fetchForecast(city)
      } else {
        this.props.updateMessage('City not found: ' + city, 3000)
      }
    } catch (error) {
      console.error(error)
      this.props.updateMessage('ERROR: City not found: ' + city, 3000)
    }
    inputBox.value = ''
  }

  // Get 5 day weather forecast from API
  fetchForecast = async (city) => {
    const result = await fetchData(city, 'forecast', this.props.units)
    this.props.updateForecast(result)
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
