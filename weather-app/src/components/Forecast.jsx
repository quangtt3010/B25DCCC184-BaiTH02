import { getWeatherInfo, showTemp, showDay } from "../utils/weather";

// YC3: dự báo 7 ngày
function Forecast({ days, unit }) {
  return (
    <div>
      <h3>Dự báo 7 ngày</h3>
      {days.map((day) => (
        <div className="day" key={day.date}>
          <span>{showDay(day.date)}</span>
          <span>{getWeatherInfo(day.code).icon}</span>
          <span>
            <b>{showTemp(day.max, unit)}</b> / {showTemp(day.min, unit)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Forecast;
