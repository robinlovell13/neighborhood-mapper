import CityComparisonForm from "@/components/city-comparison-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Neighborhood Matcher</h1>
          <p className="text-muted-foreground text-lg">
            Find similar neighborhoods across different cities around the world
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Compare Cities</CardTitle>
            <CardDescription>
              Enter an origin city and a destination city to find matching neighborhoods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CityComparisonForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

