
import { useContext } from "react"
import {Context} from "./map"


export function useMap(): maplibregl.Map|null {
    return useContext(Context).map
}