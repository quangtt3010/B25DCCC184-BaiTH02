import { CITIES } from "../data/cities";

// YC1: danh sách 8 thành phố, thành phố đang chọn được làm nổi bật
function CityList({ selectedCity, onSelect }) {
  return (
    <div className="card">
      <h2>Thành phố</h2>
      {CITIES.map((city) => (
        <button
          key={city.name}
          className={selectedCity && selectedCity.name === city.name ? "city active" : "city"}
          onClick={() => onSelect(city)}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
}

export default CityList;
