import { getWeatherInfo, showTemp, showTime } from "../utils/weather";

// YC2: thời tiết hiện tại
function CurrentWeather({ cityName, weather, unit }) {
  const info = getWeatherInfo(weather.code);

  return (
    <div>
      <h2>{cityName}</h2>
      <div className="now">
        <span className="big-icon">{info.icon}</span>
        <div>
          <div className="temp">{showTemp(weather.temp, unit)}</div>
          <div>{info.text}</div>
        </div>
      </div>
      <p>Độ ẩm: {weather.humidity}%</p>
      <p>Tốc độ gió: {Math.round(weather.wind)} km/h</p>
      <p>Cập nhật lúc: {showTime(weather.time)}</p>
    </div>
  );
}

export default CurrentWeather;
