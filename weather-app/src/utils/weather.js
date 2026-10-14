// Gọi API Open-Meteo và các hàm hỗ trợ hiển thị

export async function getWeather(city) {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=" + city.lat +
    "&longitude=" + city.lon +
    "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
    "&timezone=auto&forecast_days=7";

  const res = await fetch(url);
  if (!res.ok) throw new Error("Lỗi máy chủ " + res.status);
  const json = await res.json();

  // Gộp 3 mảng daily thành danh sách 7 ngày
  const days = json.daily.time.map((date, i) => ({
    date: date,
    code: json.daily.weather_code[i],
    max: json.daily.temperature_2m_max[i],
    min: json.daily.temperature_2m_min[i],
  }));

  return {
    temp: json.current.temperature_2m, // luôn lưu °C
    humidity: json.current.relative_humidity_2m,
    wind: json.current.wind_speed_10m,
    code: json.current.weather_code,
    time: json.current.time,
    days: days,
  };
}

// Mã thời tiết -> biểu tượng + mô tả
export function getWeatherInfo(code) {
  if (code === 0) return { icon: "☀️", text: "Trời quang" };
  if (code <= 2) return { icon: "⛅", text: "Ít mây" };
  if (code === 3) return { icon: "☁️", text: "Nhiều mây" };
  if (code === 45 || code === 48) return { icon: "🌫️", text: "Sương mù" };
  if (code >= 51 && code <= 57) return { icon: "🌦️", text: "Mưa phùn" };
  if (code >= 61 && code <= 67) return { icon: "🌧️", text: "Mưa" };
  if (code >= 71 && code <= 77) return { icon: "❄️", text: "Tuyết" };
  if (code >= 80 && code <= 82) return { icon: "🌦️", text: "Mưa rào" };
  if (code >= 95) return { icon: "⛈️", text: "Dông" };
  return { icon: "❔", text: "Không xác định" };
}

// Đổi đơn vị chỉ khi hiển thị => không cần gọi lại API
export function showTemp(celsius, unit) {
  const value = unit === "C" ? celsius : (celsius * 9) / 5 + 32;
  return Math.round(value) + "°" + unit;
}

// "2026-10-14" -> "Thứ tư (14/10)"
export function showDay(iso) {
  const names = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  const [y, m, d] = iso.split("-").map(Number);
  const weekday = names[new Date(y, m - 1, d).getDay()];
  return weekday + " (" + String(d).padStart(2, "0") + "/" + String(m).padStart(2, "0") + ")";
}

// "2026-10-14T08:15" -> "08:15 14/10/2026"
export function showTime(iso) {
  const [date, time] = iso.split("T");
  const [y, m, d] = date.split("-");
  return time + " " + d + "/" + m + "/" + y;
}
