
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface MapRendererProps {
  showPangea: boolean;
  onMapLoad: () => void;
  onPangeaMapLoad: () => void;
}

const MapRenderer = ({ showPangea, onMapLoad, onPangeaMapLoad }: MapRendererProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [pangeaMapLoaded, setPangeaMapLoaded] = useState(false);

  const handleMapLoad = () => {
    console.log("World map loaded");
    setMapLoaded(true);
    onMapLoad();
  };

  const handlePangeaMapLoad = () => {
    console.log("Pangea map loaded");
    setPangeaMapLoaded(true);
    onPangeaMapLoad();
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* World map image */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-1000",
          !showPangea ? "opacity-100 z-10" : "opacity-0 z-0"
        )}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg" 
          alt="World Map" 
          className="w-full h-full object-cover"
          onLoad={handleMapLoad}
          onError={(e) => console.error("Failed to load world map:", e)}
        />
      </div>

      {/* Pangea map image */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-1000",
          showPangea ? "opacity-100 z-10" : "opacity-0 z-0"
        )}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pangaea_continents.svg/1200px-Pangaea_continents.svg.png" 
          alt="Pangea Map" 
          className="w-full h-full object-cover"
          onLoad={handlePangeaMapLoad}
          onError={(e) => console.error("Failed to load pangea map:", e)}
        />
      </div>

      {/* Loading skeleton - only show when no maps are loaded */}
      {!mapLoaded && !pangeaMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 z-20">
          <div className="animate-pulse text-gray-500">
            Loading map...
          </div>
        </div>
      )}
    </div>
  );
};

export default MapRenderer;
