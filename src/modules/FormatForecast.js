import { format } from 'date-fns'

export const formatForecast = (forecastData, daysAhead, units) => {
  // Data forecast from API is in 3 hour increments so need to multiple 3 hours x 8 = 24 hours
  const ahead24Hours = daysAhead * 8

  const formatDay = () => {
    if (daysAhead === 0) {
      return 'Today'
    } else if (daysAhead === 1) {
      return 'Tomorrow'
    } else {
      return format(new Date(forecastData.list[ahead24Hours].dt * 1000), 'cccc')
    }
  }
  const day = formatDay()

  const formatNoonTemp = () => {
    return (forecastData.list[3 + (daysAhead * 8)].main.temp).toFixed(0)
  }
  const noonTemp = formatNoonTemp()

  // Format degrees as celsius or fahrenheit
  const formatDegreeUnit = () => {
    if (units === 'imperial') {
      return 'F'
    } else {
      return 'C'
    }
  }
  const degreeUnit = formatDegreeUnit()

  const formatForecastIcon = () => {
    return `${forecastData.list[ahead24Hours].weather[0].icon.slice(0, 2)}.svg`
  }
  const forecastIcon = formatForecastIcon()
  const forecastTable = {
    day: day,
    noonTemp: noonTemp,
    degreeUnit: degreeUnit,
    weatherDescription: forecastData.list[ahead24Hours].weather[0].description,
    weatherIcon: forecastIcon,
  }
  return forecastTable
}
