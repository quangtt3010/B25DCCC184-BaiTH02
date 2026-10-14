import { useState } from "react";
import CityList from "./components/CityList";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import { getWeather } from "./utils/weather";

function App() {
  const [city, setCity] = useState(null); // thành phố đang chọn
  const [weather, setWeather] = useState(null); // dữ liệu thời tiết
  const [status, setStatus] = useState("idle"); // idle | loading | error | success
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C"); // "C" hoặc "F"

  // Bấm thành phố (hoặc nút "Thử lại") thì gọi API
  async function chooseCity(c) {
    setCity(c);
    setStatus("loading");
    try {
      const data = await getWeather(c);
      setWeather(data);
      setStatus("success");
    } catch (e) {
      setError(e.message || "Đã có lỗi xảy ra");
      setStatus("error");
    }
  }

  return (
    <div className="app">
      <div className="top">
        <h1>Thời tiết Việt Nam</h1>
        {/* YC5: đổi °C / °F, không gọi lại API */}
        <div>
          <button className={unit === "C" ? "unit on" : "unit"} onClick={() => setUnit("C")}>
            °C
          </button>
          <button className={unit === "F" ? "unit on" : "unit"} onClick={() => setUnit("F")}>
            °F
          </button>
        </div>
      </div>

      <div className="layout">
        <CityList selectedCity={city} onSelect={chooseCity} />

        <div className="card">
          {/* YC4: các trạng thái chưa chọn, đang tải, lỗi */}
          {status === "idle" && <p className="msg">Hãy chọn một thành phố để xem thời tiết.</p>}

          {status === "loading" && <p className="msg">Đang tải dữ liệu…</p>}

          {status === "error" && (
            <div className="msg error">
              <p>Không tải được dữ liệu: {error}</p>
              <button className="retry" onClick={() => chooseCity(city)}>
                Thử lại
              </button>
            </div>
          )}

          {status === "success" && (
            <div>
              <CurrentWeather cityName={city.name} weather={weather} unit={unit} />
              <Forecast days={weather.days} unit={unit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
