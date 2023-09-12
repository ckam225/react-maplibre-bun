import  {PropsWithChildren, createContext, useContext, useEffect, useRef, useState} from 'react';
import maplibregl, {} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';


type MapProps = PropsWithChildren<{
    style: string,
    center: [number, number],
    zoom: number,
    className?: string
}>

export const Context = createContext<{ map: maplibregl.Map|null}>({map: null})

export default function Map(prop: MapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map,setMap] = useState<maplibregl.Map|null>(null)

    useEffect(()=>{
        const m = new maplibregl.Map({
            container: mapRef.current,
            style:  prop.style,
            center: [139.753, 35.6844],
            zoom: 14
        })
        m.on("click", (e)=> {
            console.log("click", e.lngLat);
        })
        setMap(m)
        return () => {
          m.remove();
        }
    }, [])

    return <Context.Provider value={{map: map}}>
        <div ref={mapRef} className={prop.className}>
          {prop.children}
        </div>
    </Context.Provider>
}
