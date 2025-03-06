"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NeighborhoodMap from "@/components/neighborhood-map"
import NeighborhoodList from "@/components/neighborhood-list"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

const defaultMappings = [
  {
    name: "Manhattan, USA to Bangkok, Thailand",
    origin: "Manhattan, USA",
    destination: "Bangkok, Thailand",
    mappings: [
      {
        origin: {
          neighborhood: "Upper East Side, Manhattan",
          coordinates: { latitude: 40.7736, longitude: -73.9566 },
        },
        destination: {
          neighborhood: "Sukhumvit, Bangkok",
          coordinates: { latitude: 13.736717, longitude: 100.560395 },
        },
      },
      {
        origin: {
          neighborhood: "Upper West Side, Manhattan",
          coordinates: { latitude: 40.787, longitude: -73.9754 },
        },
        destination: {
          neighborhood: "Siam, Bangkok",
          coordinates: { latitude: 13.7466, longitude: 100.5341 },
        },
      },
      {
        origin: {
          neighborhood: "Midtown, Manhattan",
          coordinates: { latitude: 40.7549, longitude: -73.984 },
        },
        destination: {
          neighborhood: "Silom, Bangkok",
          coordinates: { latitude: 13.7287, longitude: 100.5341 },
        },
      },
      {
        origin: {
          neighborhood: "Harlem, Manhattan",
          coordinates: { latitude: 40.8116, longitude: -73.9465 },
        },
        destination: {
          neighborhood: "Pratunam, Bangkok",
          coordinates: { latitude: 13.7515, longitude: 100.5406 },
        },
      },
      {
        origin: {
          neighborhood: "Greenwich Village, Manhattan",
          coordinates: { latitude: 40.7336, longitude: -74.0027 },
        },
        destination: {
          neighborhood: "Rattanakosin, Bangkok",
          coordinates: { latitude: 13.7525, longitude: 100.4941 },
        },
      },
    ],
  },
  {
    name: "Manhattan, USA to Lima, Peru",
    origin: "Manhattan, USA",
    destination: "Lima, Peru",
    mappings: [

      {
        origin: {
          neighborhood: "Upper East Side",
          coordinates: { latitude: 40.7736, longitude: -73.9566 }
        },
        destination: {
          neighborhood: "Miraflores",
          coordinates: { latitude: -12.1111, longitude: -77.0312 }
        }
      },
      {
        origin: {
          neighborhood: "Upper West Side",
          coordinates: { latitude: 40.787, longitude: -73.9754 }
        },
        destination: {
          neighborhood: "Barranco",
          coordinates: { latitude: -12.1439, longitude: -77.0208 }
        }
      },
      {
        origin: {
          neighborhood: "Midtown",
          coordinates: { latitude: 40.7549, longitude: -73.984 }
        },
        destination: {
          neighborhood: "San Isidro",
          coordinates: { latitude: -12.0983, longitude: -77.0367 }
        }
      },
      {
        origin: {
          neighborhood: "Harlem",
          coordinates: { latitude: 40.8116, longitude: -73.9465 }
        },
        destination: {
          neighborhood: "Surquillo",
          coordinates: { latitude: -12.1114, longitude: -77.0112 }
        }
      },
      {
        origin: {
          neighborhood: "Greenwich Village",
          coordinates: { latitude: 40.7336, longitude: -74.0027 }
        },
        destination: {
          neighborhood: "San Borja",
          coordinates: { latitude: -12.0906, longitude: -76.9933 }
        }
      }



    ]
  },
  {
    name: "Bogota, Colombia to Los Angeles, USA",
    origin: "Bogota, Colombia",
    destination: "Los Angeles, USA",
    mappings: [
      {
        "origin": {
          "neighborhood": "La Candelaria",
          "city": "Bogota",
          "country": "Colombia",
          "coordinates": {
            "latitude": 4.596515,
            "longitude": -74.073502
          }
        },
        "destination": {
          "neighborhood": "Downtown",
          "city": "Los Angeles",
          "country": "USA",
          "coordinates": {
            "latitude": 34.040713,
            "longitude": -118.246769
          }
        }
      },
      {
        "origin": {
          "neighborhood": "Chapinero",
          "city": "Bogota",
          "country": "Colombia",
          "coordinates": {
            "latitude": 4.653421,
            "longitude": -74.055687
          }
        },
        "destination": {
          "neighborhood": "Hollywood",
          "city": "Los Angeles",
          "country": "USA",
          "coordinates": {
            "latitude": 34.092809,
            "longitude": -118.328661
          }
        }
      },
      {
        "origin": {
          "neighborhood": "Usaquen",
          "city": "Bogota",
          "country": "Colombia",
          "coordinates": {
            "latitude": 4.695673,
            "longitude": -74.031591
          }
        },
        "destination": {
          "neighborhood": "Beverly Hills",
          "city": "Los Angeles",
          "country": "USA",
          "coordinates": {
            "latitude": 34.07362,
            "longitude": -118.400356
          }
        }
      },
      {
        "origin": {
          "neighborhood": "Teusaquillo",
          "city": "Bogota",
          "country": "Colombia",
          "coordinates": {
            "latitude": 4.64471,
            "longitude": -74.093752
          }
        },
        "destination": {
          "neighborhood": "West Hollywood",
          "city": "Los Angeles",
          "country": "USA",
          "coordinates": {
            "latitude": 34.090009,
            "longitude": -118.361744
          }
        }
      },
      {
        "origin": {
          "neighborhood": "Santa Fe",
          "city": "Bogota",
          "country": "Colombia",
          "coordinates": {
            "latitude": 4.60971,
            "longitude": -74.08175
          }
        },
        "destination": {
          "neighborhood": "Venice",
          "city": "Los Angeles",
          "country": "USA",
          "coordinates": {
            "latitude": 33.985047,
            "longitude": -118.469483
          }
        }
      }
    ]
  },
  { 
    name: "Miami, Florida, USA to Paris, France",
    origin: "Miami, Florida, USA",
    destination: "Paris, France",
    mappings: [
    {
      "origin": {
        "neighborhood": "Little Havana",
        "city": "Miami",
        "coordinates": {
          "latitude": 25.7771,
          "longitude": 80.2194
        }
      },
      "destination": {
        "neighborhood": "Le Marais",    
        "city": "Paris",
        "coordinates": {
          "latitude": 48.857,
          "longitude": 2.3608
        }
      }
    },
    {
      "origin": {
        "neighborhood": "Coconut Grove",
        "city": "Miami",
        "coordinates": {
          "latitude": 25.7126,
          "longitude": 80.2573
        }
      },
      "destination": {
        "neighborhood": "Montmartre",
        "city": "Paris",
        "coordinates": {
          "latitude": 48.8867,
          "longitude": 2.3389
        }
      }
    },
    {
      "origin": {
        "neighborhood": "Wynwood",
        "city": "Miami",
        "coordinates": {
          "latitude": 25.8042,
          "longitude": 80.1989
        }
      },
      "destination": {
        "neighborhood": "Latin Quarter",
        "city": "Paris",
        "coordinates": {
          "latitude": 48.8494,
          "longitude": 2.3528
        }
      }
    },
    {
      "origin": {
        "neighborhood": "Brickell",
        "city": "Miami",
        "coordinates": {
          "latitude": 25.7582,
          "longitude": 80.1936
        }
      },
      "destination": {
        "neighborhood": "Saint-Germain-des-Prés",
        "city": "Paris",
        "coordinates": {
          "latitude": 48.8536,
          "longitude": 2.3332
        }
      }
    },
    {
      "origin": {
        "neighborhood": "Design District",
        "city": "Miami",
        "coordinates": {
          "latitude": 25.8135,
          "longitude": 80.193
        }
      },
      "destination": {
        "neighborhood": "Belleville",
        "city": "Paris",
        "coordinates": {
          "latitude": 48.8715,
          "longitude": 2.3782
        }
      }
    }
  ]
},
  
  {
    name: "San Juan, Puerto Rico to Boston, Massachusetts",
    origin: "San Juan, Puerto Rico",
    destination: "Boston, Massachusetts",
    mappings: [
    {
      "origin": {
        "neighborhood": "Old San Juan",
        "coordinates": {
          "latitude": 18.4655,
          "longitude": -66.1057        
        }
      },
      "destination": {
        "neighborhood": "Beacon Hill", 
        "coordinates": {
          "latitude": 42.3587,
          "longitude": -71.0676        
        }
      }
    },
    {
      "origin": {
        "neighborhood": "Condado",     
        "coordinates": {
          "latitude": 18.4576,
          "longitude": -66.0695
        }
      },
      "destination": {
        "neighborhood": "Back Bay",
        "coordinates": {
          "latitude": 42.3503,
          "longitude": -71.081
        }
      }
    },
    {
      "origin": {
        "neighborhood": "Santurce",
        "coordinates": {
          "latitude": 18.4464,
          "longitude": -66.0708
        }
      },
      "destination": {
        "neighborhood": "North End",
        "coordinates": {
          "latitude": 42.3647,
          "longitude": -71.0536
        }
      }
    },
    {
      "origin": {
        "neighborhood": "Hato Rey",
        "coordinates": {
          "latitude": 18.4172,
          "longitude": -66.05
        }
      },
      "destination": {
        "neighborhood": "South End",
        "coordinates": {
          "latitude": 42.3388,
          "longitude": -71.0765
        }
      }
    },
    {
      "origin": {
        "neighborhood": "Miramar",
        "coordinates": {
          "latitude": 18.4663,
          "longitude": -66.0853
        }
      },
      "destination": {
        "neighborhood": "Charlestown",
        "coordinates": {
          "latitude": 42.3782,
          "longitude": -71.0602
        }
      }
    }
  ]}
]

export default function CityComparisonForm() {
  const [originCity, setOriginCity] = useState("")
  const [destinationCity, setDestinationCity] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mappings, setMappings] = useState<NeighborhoodMapping[]>([])
  const [activeTab, setActiveTab] = useState("map")
  const [key, setKey] = useState(0)

  const handleDefaultMappingChange = (value: string) => {
    // if (value === "custom") {
    //   setOriginCity("")
    //   setDestinationCity("")
    //   setMappings([])
    // } else {
    

      const selectedMapping = defaultMappings.find((mapping) => mapping.name === value)
      if (selectedMapping) {
        setOriginCity(selectedMapping.origin)
        setDestinationCity(selectedMapping.destination)
        setMappings(selectedMapping.mappings)
        
      setKey(prevKey => prevKey + 1)
      }
      
    // }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!originCity || !destinationCity) {
      setError("Please enter both origin and destination cities")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/compare-neighborhoods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: originCity,
          destination: destinationCity,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch neighborhood data")
      }

      let data = await response.json()

      setMappings(data.mappings)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="defaultMapping">Choose a default mapping</Label>
          <Select onValueChange={handleDefaultMappingChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a default mapping" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="custom">Custom</SelectItem> */}
              {defaultMappings.map((mapping, index) => (
                <SelectItem key={index} value={mapping.name}>
                  {mapping.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="originCity">Origin City</Label>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="originCity"
                placeholder="e.g. Manhattan, New York City, United States"
                className="pl-9"
                value={originCity}
                onChange={(e) => setOriginCity(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destinationCity">Destination City</Label>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="destinationCity"
                placeholder="e.g. Bangkok, Thailand"
                className="pl-9"
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
              />
            </div>
          </div>
        </div> */}

        {/* <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Finding matches..." : "Find Matching Neighborhoods"}
        </Button> */}
      </form>

      {error && <div className="p-4 bg-destructive/10 text-destructive rounded-md">{error}</div>}

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      )}

      {!isLoading && mappings.length > 0 && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="mt-4">
          <NeighborhoodMap key={key} mappings={mappings} originCity={originCity} destinationCity={destinationCity} />
          </TabsContent>
          <TabsContent value="list" className="mt-4">
            <NeighborhoodList mappings={mappings} originCity={originCity} destinationCity={destinationCity} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

