"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, ArrowRight } from "lucide-react"

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

type NeighborhoodListProps = {
  mappings: NeighborhoodMapping[]
  originCity: string
  destinationCity: string
}

export default function NeighborhoodList({ mappings, originCity, destinationCity }: NeighborhoodListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Neighborhood Comparisons</CardTitle>
        <CardDescription>
          Similar neighborhoods between {originCity} and {destinationCity}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mappings.map((mapping, index) => (
            <div key={index} className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">{mapping.origin.neighborhood}</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-6">{originCity}</p>
              </div>

              <ArrowRight className="hidden md:block h-5 w-5 text-muted-foreground" />
              <div className="md:hidden w-full flex justify-center">
                <ArrowRight className="h-5 w-5 text-muted-foreground transform rotate-90" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">{mapping.destination.neighborhood}</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-6">{destinationCity}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

