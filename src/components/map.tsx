import  { useEffect} from 'react';
// import maplibregl, {} from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';
import Maplibre from "./Map/map";
import Marker from "./Map/markers";

const APIKey = import.meta.env.VITE_APP_MAP_API_KEY



export default function MapExample() {
    
    if (APIKey == null) {
        throw new Error("You have to configure env VITE_APP_MAP_API_KEY, see README");
    }

    return (
        <div className="map-wrap">
          <a href="https://www.maptiler.com" className="watermark"><img
              src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"/></a>
                <Maplibre 
             className="map"
            style={`https://api.maptiler.com/maps/streets/style.json?key=${APIKey}`}
            center={[139.753, 35.6844]}
            zoom= {14}
            >
                <Marker coordinate={[139.7525,35.6846]}>
                    <div style={{width: "35px", height: "35px", backgroundColor: "#ff0"}}>Hi</div>
                </Marker>

                <Marker coordinate={[139.748279312131, 35.68419085375852]}/>

            </Maplibre>
          {/* <div ref={mapContainerRef} className="map"/> */}
        </div>
    );
    
}