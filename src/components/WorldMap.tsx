
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wonder, getAncientWonders, getNewWonders, wonders } from "@/utils/wonders";
import WonderMarker from "./WonderMarker";
import AntipodeMarker from "./AntipodeMarker";
import WonderCard from "./WonderCard";
import MapControls from "./MapControls";
import { cn } from "@/lib/utils";

const WorldMap = () => {
  const [selectedWonder, setSelectedWonder] = useState<Wonder | null>(null);
  const [showAncient, setShowAncient] = useState(true);
  const [showNew, setShowNew] = useState(true);
  const [showAntipodes, setShowAntipodes] = useState(true);
  const [showPangea, setShowPangea] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [pangeaMapLoaded, setPangeaMapLoaded] = useState(false);

  const ancientWonders = getAncientWonders();
  const newWonders = getNewWonders();
  
  const handleWonderSelect = useCallback((wonder: Wonder) => {
    setSelectedWonder(prev => prev?.id === wonder.id ? null : wonder);
  }, []);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const handlePangeaMapLoad = () => {
    setPangeaMapLoaded(true);
  };

  const visibleWonders = [
    ...(showAncient ? ancientWonders : []),
    ...(showNew ? newWonders : [])
  ];

  // Pangea coordinates mapping function
  // This is a simplified approximation - in a real app you might want to use proper plate tectonic calculations
  const getPangeaCoordinates = (wonder: Wonder) => {
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

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-4 left-4 z-30">
        <MapControls 
          showAncient={showAncient}
          showNew={showNew}
          showAntipodes={showAntipodes}
          showPangea={showPangea}
          onToggleAncient={() => setShowAncient(prev => !prev)}
          onToggleNew={() => setShowNew(prev => !prev)}
          onToggleAntipodes={() => setShowAntipodes(prev => !prev)}
          onTogglePangea={() => setShowPangea(prev => !prev)}
        />
      </div>

      <div className="flex-1 relative overflow-hidden">
        {/* Map container */}
        <div className="w-full h-full relative overflow-hidden">
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

          {/* Map overlay with wonders */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full">
              {/* Wonder markers */}
              {visibleWonders.map(wonder => {
                // Get the appropriate coordinates based on the current map view
                const coordinates = showPangea 
                  ? getPangeaCoordinates(wonder)
                  : { longitude: wonder.location.longitude, latitude: wonder.location.latitude };
                
                return (
                  <div key={wonder.id} className="pointer-events-auto">
                    <WonderMarker 
                      wonder={wonder} 
                      onClick={handleWonderSelect} 
                      isSelected={selectedWonder?.id === wonder.id}
                      delayed={true}
                      customCoordinates={coordinates}
                    />
                  </div>
                );
              })}

              {/* Antipode markers - only show on modern map */}
              {showAntipodes && !showPangea && visibleWonders.map(wonder => (
                <div key={`antipode-${wonder.id}`} className="pointer-events-auto">
                  <AntipodeMarker 
                    wonder={wonder} 
                    onClick={handleWonderSelect} 
                    isSelected={selectedWonder?.id === wonder.id}
                    delayed={true}
                  />
                </div>
              ))}

              {/* Connection lines between wonders and antipodes - only on modern map */}
              {showAntipodes && !showPangea && selectedWonder && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    x1={`${((selectedWonder.location.longitude + 180) / 360) * 100}%`}
                    y1={`${((selectedWonder.location.latitude * -1) + 90) / 180 * 100}%`}
                    x2={`${((selectedWonder.antipode.longitude + 180) / 360) * 100}%`}
                    y2={`${((selectedWonder.antipode.latitude * -1) + 90) / 180 * 100}%`}
                    stroke={selectedWonder.type === 'ancient' ? "#3b82f6" : "#10b981"}
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Selected wonder info panel */}
          <AnimatePresence>
            {selectedWonder && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-md px-4">
                <WonderCard 
                  wonder={selectedWonder} 
                  onClose={() => setSelectedWonder(null)} 
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend */}
      <motion.div 
        className="absolute bottom-4 right-4 z-20 glass-panel rounded-lg p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="text-xs font-medium uppercase text-gray-500 mb-2">Legend</div>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-wonder-ancient"></div>
            <span className="text-xs">Ancient Wonder (1-7)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-wonder-new"></div>
            <span className="text-xs">New Wonder (8-14)</span>
          </div>
          {!showPangea && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-wonder-antipode"></div>
              <span className="text-xs">Antipode Point (1A-14A)</span>
            </div>
          )}
          {showPangea && (
            <div className="flex items-center space-x-2">
              <div className="italic text-xs text-amber-600">
                *Positions are approximate
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default WorldMap;
