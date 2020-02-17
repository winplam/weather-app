// Fetch current weather data (type: weather) OR Fetch 5 day / 3 hour forecast table (type: forecast) using promise/then
// Units is imperial or metric
export const fetchData = (location, type, units) => {
  const baseURL = 'https://api.openweathermap.org/data/2.5/'
  let response
  if (location === '' && (units === 'metric' || units === 'imperial')) {
    response = fetch(`./data/sample-${type}-${units}.json`, { mode: 'no-cors' })
      .then(data => {return data.json()})
  } else if (location) {
    console.info('Calling OpenWeather API')
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY
    response = fetch(`${baseURL}${type}?q=${location}&units=${units}&APPID=${apiKey}`, { mode: 'cors' })
      .then(data => {
        if (data.statusText === 'OK') {
          saveLastInput(location, units)
          return data.json()
        }
      }).catch(error => console.error(error))
  } else {
    response = fetch(`./data/sample-${type}-imperial.json`, { mode: 'no-cors' })
      .then(data => {return data.json()})
  }
  return response
}

// Save previous location and unit preferences and restore on next visit
function saveLastInput (location, units) {
  // Check if localStorage is supported by browser
  console.log('Saving last input: ' + location + ' : ' + units)
  if (typeof (Storage) !== 'undefined') {
    localStorage.setItem('last-input', JSON.stringify([location, units]))
  } else {
    console.info('No web storage support')
  }
}

// Get city and country code by IP of visitor using public web API
export const fetchIPLookup = () => {
  return fetch('https://extreme-ip-lookup.com/json/', { mode: 'cors' })
    .then(data => {return data.json()})
    .catch(reason => {return reason})
}
