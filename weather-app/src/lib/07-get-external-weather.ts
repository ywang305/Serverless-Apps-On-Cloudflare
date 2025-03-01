type OpenMeteoApiResponse = {
  current_weather: {
    temperature: number,
    windspeed: number
  }
}

const getExternalWeatherData = async (lat: number, long: number) => {
  const data_url = "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${lat}&longitude=${long}&current_weather=true`

  return fetch(data_url)
    .then(response => response.json() as Promise<OpenMeteoApiResponse>)
    .then(response => {
      return {
        temperature_celsius: response.current_weather.temperature,
        windspeed_kph: response.current_weather.windspeed
      }
    })
}

export default getExternalWeatherData;
