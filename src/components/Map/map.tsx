import  {PropsWithChildren, createContext, useEffect, useRef, useState} from 'react';
import maplibregl, {} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

type ViewPort = {
    center: [number, number],
    zoom: number,
}

type MapProps = PropsWithChildren<{
    style: string,
    viewPort: ViewPort,
    className?: string,
    width?:string | number
    height?:string | number
}>

export const Context = createContext<{ map: maplibregl.Map|null}>({map: null})

export default function Map(prop: MapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map,setMap] = useState<maplibregl.Map|null>(null)

    useEffect(()=>{
        const m = new maplibregl.Map({
            container: mapRef.current,
            style:  prop.style,
            center: prop.viewPort.center,
            zoom: prop.viewPort.zoom
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
        <div ref={mapRef} className={prop.className} style={{height: prop.height, width: prop.width}}>
          {prop.children}
        </div>
    </Context.Provider>
}
