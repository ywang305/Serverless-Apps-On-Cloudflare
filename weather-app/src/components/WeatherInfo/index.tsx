type WeatherInfoProps = {
  location: string;
  temperature: number;
  windspeed: number;
};

export const WeatherInfo = ({
  location,
  temperature,
  windspeed,
}: WeatherInfoProps) => {
  return (
    <div className="card shadow-0 border">
      <div className="card-body p-4">
        <h4 className="mb-1 sfw-normal">{location}</h4>
        <p className="mb-2">
          Current temperature:
          <strong>{temperature.toString()}°C</strong>
        </p>
        <p className="mb-2">
          Windspeed: <strong>{windspeed.toString()}kph</strong>
        </p>
      </div>
    </div>
  );
};
