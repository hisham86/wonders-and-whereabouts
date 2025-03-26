
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
    setMapLoaded(true);
    onMapLoad();
  };

  const handlePangeaMapLoad = () => {
    setPangeaMapLoaded(true);
    onPangeaMapLoad();
  };

  return (
    <>
      {/* World map image */}
      <motion.div 
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: !showPangea && mapLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg" 
          alt="World Map" 
          className={cn(
            "w-full h-full object-cover transition-opacity duration-1000", 
            !showPangea && mapLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleMapLoad}
        />
      </motion.div>

      {/* Pangea map image */}
      <motion.div 
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showPangea && pangeaMapLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pangaea_continents.svg/1200px-Pangaea_continents.svg.png" 
          alt="Pangea Map" 
          className={cn(
            "w-full h-full object-cover transition-opacity duration-1000", 
            showPangea && pangeaMapLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handlePangeaMapLoad}
        />
      </motion.div>

      {/* Loading skeleton */}
      {(!mapLoaded || (showPangea && !pangeaMapLoaded)) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="animate-pulse text-gray-500">
            Loading {showPangea ? "Pangea" : "world"} map...
          </div>
        </div>
      )}
    </>
  );
};

export default MapRenderer;
