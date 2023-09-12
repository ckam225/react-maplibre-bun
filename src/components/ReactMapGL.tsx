import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const APIKey = import.meta.env.VITE_APP_MAP_API_KEY

export default function ReactMapGL() {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${APIKey}`}
    />
  );
}