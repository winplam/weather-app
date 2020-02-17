import { format } from 'date-fns'

export const formatReport = (weatherData, units) => {
  const formatDate = () => {
    return format(new Date(weatherData.dt * 1000), 'd MMMM, yyyy')
  }
  const date = formatDate()

  const formatDay = () => {
    return format(new Date(weatherData.dt * 1000), 'cccc')
  }
  const day = formatDay()

  // Return whole integer if temperature ends in ".0". Otherwise display to 1/10th of a degree.
  const formatDegree = () => {
    const degree = (weatherData.main.temp).toFixed(1)
    const lastDigit = degree.split('.')[1]
    if (lastDigit === '0') {
      return degree.split('.')[0]
    } else {
      return degree
    }
  }
  const degree = formatDegree()

  // Format degrees as celsius or fahrenheit
  const formatDegreeUnit = () => {
    if (units === 'imperial') {
      return 'F'
    } else {
      return 'C'
    }
  }
  const degreeUnit = formatDegreeUnit()

  const cardinalDirection = () => {
    return ['N ↑', 'NE ↗', 'E →', 'SE ↘', 'S ↓', 'SW ↙', 'W ←', 'NW ↖'][Math.round(weatherData.wind.deg / 45) % 8]
  }
  const windDirection = cardinalDirection()

  const formatWeatherIcon = () => {
    return `${weatherData.weather[0].icon.slice(0, 2)}.svg`
  }
  const weatherIcon = formatWeatherIcon()

  // Format windspeed aas m/h or km/h
  const formatWindUnit = () => {
    if (units === 'imperial') {
      return 'mi/h'
    } else {
      return 'km/h'
    }
  }
  const windUnits = formatWindUnit()

  const weatherReport = {
    city: weatherData.name,
    cloudiness: weatherData.clouds.all,
    country: weatherData.sys.country,
    date: date,
    day: day,
    degree: degree,
    degreeUnit: degreeUnit,
    weatherDescription: weatherData.weather[0].description,
    weatherIcon: weatherIcon,
    windDirection: windDirection,
    windSpeed: weatherData.wind.speed,
    windUnits: windUnits,
  }
  return weatherReport
}
