import Maplibre from "./Map/map";
import Marker from "./Map/markers";
import SymbolLayer from "./Map/symbolLayer";

const APIKey = import.meta.env.VITE_APP_MAP_API_KEY



export default function MapExample() {

    if (APIKey == null) {
        throw new Error("You have to configure env VITE_APP_MAP_API_KEY, see README");
    }

    return (
        <div className="map-wrap">


            <Maplibre
                className="map"
                style={`https://api.maptiler.com/maps/streets/style.json?key=${APIKey}`}
                viewPort={{
                    center: [139.753, 35.6844],
                    zoom: 14
                }}
                height="100vh"
                width="100vw"
            >
                <Marker coordinate={[139.7525, 35.6846]}>
                    <div style={{ width: "35px", height: "35px", backgroundColor: "#ff0" }}>Hi</div>
                </Marker>

                <Marker coordinate={[139.748279312131, 35.68419085375852]} />
                <SymbolLayer coordinate={[139.75219318549114, 35.68272090567268]}/>

            </Maplibre>


            <a href="https://www.maptiler.com" className="watermark"><img
                src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo" /></a>
        </div>
    );

}