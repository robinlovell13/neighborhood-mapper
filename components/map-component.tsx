"use client"

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

type Neighborhood = {
  neighborhood: string
  coordinates:
 {
        latitude: number
        longitude: number
      }
    
}

type NeighborhoodMapping = {
  origin: Neighborhood
  destination: Neighborhood
}

type MapComponentProps = {
  center: [number, number]
  zoom: number
  mappings: NeighborhoodMapping[]
}

const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function MapComponent({ center, zoom, mappings }: MapComponentProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%", borderRadius: "0 0 0.5rem 0.5rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {mappings.map((mapping, index) => {
       const lat = mapping.destination.coordinates["latitude"];
       const lng = mapping.destination.coordinates["longitude"];
        const label = `${mapping.destination.neighborhood} (${mapping.origin.neighborhood})`

        return (
          <Marker key={index} position={[lat, lng]} icon={customIcon}>
            <Tooltip>{label}</Tooltip>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{mapping.destination.neighborhood}</p>
                <p className="text-muted-foreground">Similar to {mapping.origin.neighborhood}</p>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

