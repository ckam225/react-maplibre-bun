import React, { ReactElement, useEffect } from 'react'
import {useMap} from './hooks'
import pin from '../../assets/car.svg';

type LayerPropProps =  {
    coordinate: [number,number],
    color?: string,
    children?: ReactElement
}

export default function SymbolLayer(prop: LayerPropProps){

    const { coordinate, children} = prop

    const map = useMap()

    useEffect(()  => {
        if(map){

        
            map.on('load', function() {


            
                const width = 35;
                const height = 35;
                const img = new Image(width, height);
                img.onload = () => map.addImage('marker', img);
                img.src = pin;

                

                // // method 2
                // map.loadImage("http://storage.lineo.ci/transports/places/images/restaurant.png", function(error, image) {
                //     if (error) throw error;
                //     map.addImage("marker", image as HTMLImageElement)
                // });


                map.addLayer({
                    id: 'my-marker',
                    type: 'symbol',
                    source: {
                      type: 'geojson',
                      data: {
                        type: "FeatureCollection",
                        features: [{
                          type: "Feature",
                          geometry: {
                            type: "Point",
                            coordinates: [coordinate[0],coordinate[1]]
                          }
                        }]
                      }
                    },
                    layout: {
                      'icon-image': 'marker',
                      'icon-size': 0.8
                    }
                });
            });

           
        
        }
    }, [map, children])

       return <React.Fragment/>
}




