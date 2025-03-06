const rawData = [
  {
    origin: {
      neighborhood: 'Little Havana',       
      city: 'Miami',
      coordinates: '25.7771, 80.2194'
    },
    destination: {
      neighborhood: 'Le Marais',
      city: 'Paris',
      coordinates: '48.8570, 2.3608' 
    }
  },
  {
    origin: {
      neighborhood: 'Coconut Grove',       
      city: 'Miami',
      coordinates: '25.7126, 80.2573'
    },
    destination: {
      neighborhood: 'Montmartre',
      city: 'Paris',
      coordinates: '48.8867, 2.3389'
    }
  },
  {
    origin: {
      neighborhood: 'Wynwood',
      city: 'Miami',
      coordinates: '25.8042, 80.1989'
    },
    destination: {
      neighborhood: 'Latin Quarter',
      city: 'Paris',
      coordinates: '48.8494, 2.3528'
    }
  },
  {
    origin: {
      neighborhood: 'Brickell',
      city: 'Miami',
      coordinates: '25.7582, 80.1936'
    },
    destination: {
      neighborhood: 'Saint-Germain-des-Prés',
      city: 'Paris',
      coordinates: '48.8536, 2.3332'
    }
  },
  {
    origin: {
      neighborhood: 'Design District',
      city: 'Miami',
      coordinates: '25.8135, 80.1930'
    },
    destination: {
      neighborhood: 'Belleville',
      city: 'Paris',
      coordinates: '48.8715, 2.3782'
    }
  }
]

const convertCoordinates = (arr) => {
  return arr.map((mapping) => ({
    origin: {
      ...mapping.origin,
      coordinates: parseCoordinates(mapping.origin.coordinates)
    },
    destination: {
      ...mapping.destination,
      coordinates: parseCoordinates(mapping.destination.coordinates)
    }
  }));
};

const parseCoordinates = (coordString) => {
  const [latitude, longitude] = coordString.split(",").map(Number);
  return { latitude, longitude };
};


 

const formattedData = convertCoordinates(rawData);
console.log(JSON.stringify(formattedData, null, 2));
