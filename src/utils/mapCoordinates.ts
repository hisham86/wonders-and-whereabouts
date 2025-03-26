
import { Wonder } from "./wonders";

// Pangea coordinates mapping function
// This is a simplified approximation - in a real app you might want to use proper plate tectonic calculations
export const getPangeaCoordinates = (wonder: Wonder) => {
  // These are very rough estimations for demonstration purposes
  // In a real implementation, you would use actual geological data for Pangea mapping
  
  // Simple transformation rules based on continental drift (very approximate)
  let longitude = wonder.location.longitude;
  let latitude = wonder.location.latitude;
  
  // Africa (roughly central in Pangea)
  if (longitude > 0 && longitude < 40 && latitude > -35 && latitude < 35) {
    // Africa remains relatively in place as a reference point
    return { longitude, latitude };
  }
  
  // Europe (move south and east of current position)
  else if (longitude > -10 && longitude < 40 && latitude > 35 && latitude < 70) {
    return { 
      longitude: longitude - 10, 
      latitude: latitude - 30
    };
  }
  
  // Asia (move south and west)
  else if (longitude > 40 && longitude < 150 && latitude > 0) {
    return { 
      longitude: longitude - 40, 
      latitude: latitude - 20
    };
  }
  
  // North America (move east and south)
  else if (longitude < -30 && latitude > 15) {
    return { 
      longitude: longitude + 90, 
      latitude: latitude - 30
    };
  }
  
  // South America (move east)
  else if (longitude > -80 && longitude < -30 && latitude < 15) {
    return { 
      longitude: longitude + 50, 
      latitude
    };
  }
  
  // Australia (move north and west)
  else if (longitude > 110 && longitude < 155 && latitude < -10) {
    return { 
      longitude: longitude - 40, 
      latitude: latitude + 30
    };
  }
  
  // For any other locations, make a smaller adjustment
  return { 
    longitude: longitude * 0.7, 
    latitude: latitude * 0.9
  };
};
