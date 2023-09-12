import React, {  PropsWithChildren, ReactElement, useEffect } from 'react'
import {useMap} from './hooks'
import maplibregl from 'maplibre-gl';
import ReactDomServer from "react-dom/server"

type MarkerProps =  {
    coordinate: [number,number],
    color?: string,
    children?: ReactElement
}

export default function Marker(prop: MarkerProps){

    const {color="#FF0000", coordinate, children} = prop

    const map = useMap()

    useEffect(()  => {
        if(map){
            const markerOpt : maplibregl.MarkerOptions = {color: color}
            if(children){
                const output = document.createElement('div')
                output.innerHTML = ReactDomServer.renderToString(children)
                markerOpt.element = output
            }

            new maplibregl.Marker(markerOpt)
            .setLngLat([coordinate[0],coordinate[1]])
            .addTo(map);
        
        }
    }, [map, children])

       return <React.Fragment/>
}