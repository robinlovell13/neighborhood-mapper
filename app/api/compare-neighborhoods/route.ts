import { OpenAI } from "openai"
import { NextResponse } from "next/server"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { origin, destination } = await req.json()

    if (!origin || !destination) {
      return NextResponse.json({ error: "Origin and destination cities are required" }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You take an origin city and a destination city as input, then use your browser capabilities to determine the top five neighborhoods in each city based on cultural, geographic, or socioeconomic relevance. You output a JSON list of mapping pairs where each pair matches an origin neighborhood to a destination neighborhood with their respective coordinates. The response is strictly limited to this JSON format with no additional text.",
        },
        {
          role: "user",
          content: `Origin: ${origin}; Destination: ${destination}`,
        },
      ],
      temperature: 0.0,
      max_tokens: 600,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
   
    const response = JSON.parse(completion.choices[0].message.content || "{}");

// Check if response is an object and contains a valid mappings array
if (response && Array.isArray(response.mappings)) {
    response.mappings.map((mapping) => {
      let coordinates = mapping.destination.coordinates;
  
      if (typeof coordinates === "object" && !Array.isArray(coordinates)) {
          // Keep as is if it's already an object
          return mapping;
      } else if (typeof coordinates === "string") {
          // Convert string to object with "latitude" and "longitude" props
          const [lat, lng] = coordinates.split(",").map(Number);
          mapping.destination.coordinates = { latitude: lat, longitude: lng };
      } else if (Array.isArray(coordinates)) {
          // Convert array to object with "latitude" and "longitude" props
          mapping.destination.coordinates = { latitude: coordinates[0], longitude: coordinates[1] };
      }
  
      return mapping;
  });
}
console.log("response", JSON.stringify(response, null, 2))
    // const response = [
    //   {
    //     "origin": {
    //       "neighborhood": "Upper East Side, Manhattan",
    //       "coordinates": "40.7736,-73.9566"
    //     },
    //     "destination": {
    //       "neighborhood": "Miraflores, Lima",
    //       "coordinates": "-12.1111,-77.0312"
    //     }
    //   },
    //   {
    //     "origin": {
    //       "neighborhood": "Upper West Side, Manhattan",
    //       "coordinates": "40.7870,-73.9754"
    //     },
    //     "destination": {
    //       "neighborhood": "Barranco, Lima",
    //       "coordinates": "-12.1439,-77.0208"
    //     }
    //   },
    //   {
    //     "origin": {
    //       "neighborhood": "Midtown Manhattan",
    //       "coordinates": "40.7549,-73.9840"
    //     },
    //     "destination": {
    //       "neighborhood": "San Isidro, Lima",
    //       "coordinates": "-12.0983,-77.0367"
    //     }
    //   },
    //   {
    //     "origin": {
    //       "neighborhood": "SoHo, Manhattan",
    //       "coordinates": "40.7233,-74.0030"
    //     },
    //     "destination": {
    //       "neighborhood": "Surquillo, Lima",
    //       "coordinates": "-12.1114,-77.0112"
    //     }
    //   },
    //   {
    //     "origin": {
    //       "neighborhood": "Harlem, Manhattan",
    //       "coordinates": "40.8116,-73.9465"
    //     },
    //     "destination": {
    //       "neighborhood": "La Victoria, Lima",
    //       "coordinates": "-12.0726,-77.0172"
    //     }
    //   }
    // ]
    
    return NextResponse.json({ mappings: response })
  } catch (error) {
    console.error("Error comparing neighborhoods:", error)
    return NextResponse.json({ error: "Failed to compare neighborhoods" }, { status: 500 })
  }
}

