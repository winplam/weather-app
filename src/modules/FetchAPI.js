// Fetch current weather data (type: weather) OR Fetch 5 day / 3 hour forecast table (type: forecast) using promise/then
// Units is imperial or metric
export const fetchData = async (location, type, units) => {
  const baseURL = 'https://api.openweathermap.org/data/2.5/'
  let result
  if (location === '' && (units === 'metric' || units === 'imperial')) {
    result = await fetch(`./data/sample-${type}-${units}.json`, { mode: 'no-cors' })
    return result.json()
  } else if (location) {
    console.info('Calling OpenWeather API')
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY
    try {
      result = await fetch(`${baseURL}${type}?q=${location}&units=${units}&APPID=${apiKey}`, { mode: 'cors' })
      if (result.statusText === 'OK') {
        saveLastInput(location, units)
        return result.json()
      }
    } catch (error) {console.error(error)}
  } else {
    result = await fetch(`./data/sample-${type}-imperial.json`, { mode: 'no-cors' })
    return result.json()
  }
  return result
}

// Save previous location and unit preferences and restore on next visit
function saveLastInput (location, units) {
  // Check if localStorage is supported by browser
  if (typeof (Storage) !== 'undefined') {
    localStorage.setItem('last-input', JSON.stringify([location, units]))
  } else {
    console.info('No web storage support')
  }
}

// Get city and country code by IP of visitor using public web API
export const fetchIPLookup = async () => {
  try {
    const result = await fetch('https://extreme-ip-lookup.com/json/', { mode: 'cors' })
    return result.json()
  } catch (error) {
    return error
  }
}
