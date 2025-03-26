
import { Wonder } from "./wonders";

// Pangea coordinates mapping function
// This is a simplified approximation - in a real app you might want to use proper plate tectonic calculations
export const getPangeaCoordinates = (wonder: Wonder) => {
  // These are very rough estimations for demonstration purposes
  // In a real implementation, you would use actual geological data for Pangea mapping
  
  // Get continent based on location
  const continent = getContinentFromCoordinates(wonder.location.latitude, wonder.location.longitude);
  
  // Use the continent to determine the transformation
  switch (continent) {
    case 'africa':
      // Africa remains relatively in place as a reference point
      return { 
        longitude: wonder.location.longitude, 
        latitude: wonder.location.latitude 
      };
      
    case 'europe':
      // Europe moved south and east from current position
      return { 
        longitude: wonder.location.longitude - 10,
        // Maintain relative position within Europe while shifting the continent
        latitude: wonder.location.latitude - 30
      };
      
    case 'asia':
      // Asia moved south and west
      return { 
        // Maintain position within Asia while moving the entire continent
        longitude: wonder.location.longitude - 40,
        latitude: wonder.location.latitude - 20
      };
      
    case 'north_america':
      // North America moved east and south
      return { 
        // Maintain relative position within North America
        longitude: wonder.location.longitude + 90,
        latitude: wonder.location.latitude - 30
      };
      
    case 'south_america':
      // South America moved east
      return { 
        // Maintain position within South America
        longitude: wonder.location.longitude + 50,
        latitude: wonder.location.latitude
      };
      
    case 'australia':
      // Australia moved north and west
      return { 
        // Maintain position within Australia
        longitude: wonder.location.longitude - 40,
        latitude: wonder.location.latitude + 30
      };
      
    default:
      // For any other locations, make a smaller adjustment
      return { 
        longitude: wonder.location.longitude * 0.7, 
        latitude: wonder.location.latitude * 0.9
      };
  }
};

// Helper function to determine which continent a coordinate belongs to
function getContinentFromCoordinates(lat: number, lng: number): string {
  // Africa
  if (lng > -20 && lng < 50 && lat > -35 && lat < 35) {
    return 'africa';
  }
  
  // Europe
  else if (lng > -15 && lng < 45 && lat > 35 && lat < 70) {
    return 'europe';
  }
  
  // Asia
  else if (lng > 45 && lng < 150 && lat > 0 && lat < 75) {
    return 'asia';
  }
  
  // North America
  else if (lng < -30 && lng > -170 && lat > 15 && lat < 75) {
    return 'north_america';
  }
  
  // South America
  else if (lng > -85 && lng < -30 && lat < 15 && lat > -60) {
    return 'south_america';
  }
  
  // Australia
  else if (lng > 110 && lng < 155 && lat < -10 && lat > -45) {
    return 'australia';
  }
  
  // Default to oceanic
  return 'oceanic';
}
