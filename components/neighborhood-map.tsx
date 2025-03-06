"use client"

import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import L from "leaflet"

type Neighborhood = {
  neighborhood: string
  coordinates: {
        latitude: number
        longitude: number
      }
   
    
}

type NeighborhoodMapping = {
  origin: Neighborhood
  destination: Neighborhood
}

type NeighborhoodMapProps = {
  mappings: NeighborhoodMapping[]
  originCity: string
  destinationCity: string
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

export default function NeighborhoodMap({ mappings, originCity, destinationCity }: NeighborhoodMapProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Map...</CardTitle>
          <CardDescription>The map will appear shortly</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] bg-muted/20 flex items-center justify-center">
          <p>Map is loading...</p>
        </CardContent>
      </Card>
    )
  }

  const firstDestination = mappings[0]?.destination
  let centerLat, centerLng

  if (firstDestination) {
    const coords = firstDestination.coordinates
      centerLat = coords.latitude
      centerLng = coords.longitude
    
  } else {
    centerLat = 0
    centerLng = 0
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Neighborhood Map: {destinationCity}</CardTitle>
        <CardDescription>
          Showing similar neighborhoods between {originCity} and {destinationCity}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-[400px]">
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={12}
          style={{ height: "100%", width: "100%", borderRadius: "0 0 0.5rem 0.5rem" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {mappings.map((mapping, index) => {
            const destCoords = mapping.destination.coordinates

            let lat: number, lng: number
            
            lat = destCoords["latitude"];
            lng = destCoords["longitude"];
          
            
           console.log("lat", lat, "lng", lng)
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
      </CardContent>
    </Card>
  )
}

