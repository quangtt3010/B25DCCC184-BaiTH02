# Thời tiết Việt Nam

Ứng dụng React xem thời tiết 8 thành phố, dữ liệu từ Open-Meteo (miễn phí, không cần API key).

## Cách chạy

```
npm install
npm run dev
```

Mở địa chỉ hiện trong terminal (thường là http://localhost:5173), để terminal mở trong lúc dùng.

Nếu PowerShell báo "running scripts is disabled", dùng `npm.cmd install` và `npm.cmd run dev`.

## Cấu trúc

```
weather-app/
├─ index.html
├─ package.json
├─ vite.config.js
└─ src/
   ├─ main.jsx                  điểm khởi động
   ├─ App.jsx                   state chính, gọi API, ghép các component
   ├─ App.css                   giao diện (có responsive)
   ├─ data/cities.js            8 thành phố + tọa độ
   ├─ utils/weather.js          gọi API, đổi °C/°F, định dạng ngày giờ, mã thời tiết
   └─ components/
      ├─ CityList.jsx           YC1: danh sách thành phố
      ├─ CurrentWeather.jsx     YC2: thời tiết hiện tại
      └─ Forecast.jsx           YC3: dự báo 7 ngày
```
