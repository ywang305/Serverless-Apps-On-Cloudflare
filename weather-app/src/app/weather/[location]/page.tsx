/* eslint-disable @next/next/no-async-client-component */
"use client";

import { WeatherInfo } from "@/components/WeatherInfo";
import { use, useEffect, useState } from "react";
import Link from "next/link";

type Weather = {
  location: string;
  temperature: number;
  windspeed: number;
};

type WeatherApiResponse = {
  title: string;
  temperature_celsius: number;
  windspeed_kph: number;
};

export const runtime = "edge";

export default function Page({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = use(params);
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  useEffect(() => {
    fetch(`/api/weather?country=${location}`)
      .then((response) => response.json<WeatherApiResponse>())
      .then((response) =>
        setWeatherData({
          location: response.title,
          temperature: response.temperature_celsius,
          windspeed: response.windspeed_kph,
        })
      );
  }, [location]);
  return (
    <>
      {weatherData && (
        <>
          <div id="weather-info">
            <WeatherInfo
              location={weatherData.location}
              temperature={weatherData.temperature}
              windspeed={weatherData.windspeed}
            />
          </div>
          <Link href="/">Back</Link>
        </>
      )}

      {!weatherData && (
        <div>
          <h3 id="loading-text">Loading...</h3>
        </div>
      )}
    </>
  );
}
