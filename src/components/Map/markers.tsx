import React, { ReactElement, useEffect, useState } from 'react'
import {useMap} from './hooks'
import maplibregl from 'maplibre-gl';
import ReactDomServer from "react-dom/server"

type MarkerProps =  {
    id: string
    coordinate: [number,number],
    color?: string,
    children?: ReactElement,
    minZoom?: number
}

export default function Marker(prop: MarkerProps){

    const {color="#FF0000", coordinate, children} = prop
    const [marker, setMarker] = useState<maplibregl.Marker>()

    const map = useMap()

    useEffect(()  => {
        if(map){
            const markerOpt : maplibregl.MarkerOptions = {color: color}
            if(children){
                const output = document.createElement('div')
                output.id = prop.id
                output.style.transition = "visibility 0.7s linear,opacity 0.3s linear"
                output.innerHTML = ReactDomServer.renderToString(children)
                markerOpt.element = output
            }

        

            map.on("zoom", (e) => {
                console.log("zoom", e.target.getZoom());
                
                if(prop.minZoom) {
                    const el =  document.getElementById(prop.id)
                     if(el == undefined) return
                     if(e.target.getZoom() < prop.minZoom){
                        el.style.visibility = "collapse"
                        console.log("on zoom",   el.id, "collapse");
                     }else{
                         el.style.visibility = "visible"
                         console.log("on zoom",   el.id, "visible");
                     }
                 }
                // const scalePercent = 1 + (map.getZoom() - 8)  * 0.8;
                    // const svgElement = marker.getElement().children[0] as SVGAElement;
                    // svgElement.style.transform = `scale(${scalePercent})`;
                    // svgElement.style.transformOrigin = 'bottom';
                    // console.log("on zoom");
            });

           setMarker(
            new maplibregl.Marker(markerOpt)
            .setLngLat([coordinate[0],coordinate[1]])
            .addTo(map)
           )
        
        }
    }, [map, children])

       return <React.Fragment/>
}