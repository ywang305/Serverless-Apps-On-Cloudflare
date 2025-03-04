import getExternalWeatherData from "@/lib/07-get-external-weather";
import { getRequestContext } from '@cloudflare/next-on-pages'


export const runtime = 'edge';

const countries = [
  {
    country: "london",
    title: "London, UK",
    lat: 51.50853,
    long: -0.12574
  },
  {
    country: "new-york",
    title: "New York, US",
    lat: 40.71427,
    long: -74.00597
  },
  {
    country: "los-angeles",
    title: "Los Angeles, US",
    lat: 34.05223,
    long: -118.24368
  },
  {
    country: "berlin",
    title: "Berlin, Germany",
    lat: 52.52437,
    long: 13.41053
  },
  {
    country: "tokyo",
    title: "Tokyo, Japan",
    lat: 35.6895,
    long: 139.69171
  }
]

export async function GET(request: Request) {
  const cache = getRequestContext().env.WEATHER_CACHE;
  const request_url = new URL(request.url)
  const requested_country = request_url.searchParams.get('country')
  const country_config = countries.find(
    (c) => c.country == requested_country
  )

  if (!country_config) {
    return new Response(
      'You must provide a valid country',
      { status: 404 }
    )
  }

  const cache_data = await cache.get(`location:${requested_country}`)

  let weather_data
  if (!cache_data) {
    console.log("No cached data found")

    weather_data = await getExternalWeatherData(
      country_config.lat,
      country_config.long
    );

    await cache.put(
      `location:${requested_country}`,
      JSON.stringify(weather_data),
      { expirationTtl: 3600 } // 1 hour
    );
  } else {
    console.log("Cached data found")

    weather_data = JSON.parse(cache_data)
  }

  const response = {
    temperature_celsius: weather_data.temperature_celsius,
    windspeed_kph: weather_data.windspeed_kph,
    title: country_config.title
  }

  return new Response(JSON.stringify(response), {
    headers: { 'content-type': 'application/json' }
  });
}
