
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
  const [mapLoaded, setMapLoaded] = useState(false);

  const ancientWonders = getAncientWonders();
  const newWonders = getNewWonders();
  
  const handleWonderSelect = useCallback((wonder: Wonder) => {
    setSelectedWonder(prev => prev?.id === wonder.id ? null : wonder);
  }, []);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const visibleWonders = [
    ...(showAncient ? ancientWonders : []),
    ...(showNew ? newWonders : [])
  ];

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-4 left-4 z-30">
        <MapControls 
          showAncient={showAncient}
          showNew={showNew}
          showAntipodes={showAntipodes}
          onToggleAncient={() => setShowAncient(prev => !prev)}
          onToggleNew={() => setShowNew(prev => !prev)}
          onToggleAntipodes={() => setShowAntipodes(prev => !prev)}
        />
      </div>

      <div className="flex-1 relative overflow-hidden">
        {/* Map container */}
        <div className="w-full h-full relative overflow-hidden">
          {/* World map image */}
          <motion.div 
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: mapLoaded ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg" 
              alt="World Map" 
              className={cn(
                "w-full h-full object-cover transition-opacity duration-1000", 
                mapLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={handleMapLoad}
            />
          </motion.div>

          {/* Loading skeleton */}
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
              <div className="animate-pulse text-gray-500">Loading world map...</div>
            </div>
          )}

          {/* Map overlay with wonders */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full">
              {/* Wonder markers */}
              {visibleWonders.map(wonder => (
                <div key={wonder.id} className="pointer-events-auto">
                  <WonderMarker 
                    wonder={wonder} 
                    onClick={handleWonderSelect} 
                    isSelected={selectedWonder?.id === wonder.id}
                    delayed={true}
                  />
                </div>
              ))}

              {/* Antipode markers */}
              {showAntipodes && visibleWonders.map(wonder => (
                <div key={`antipode-${wonder.id}`} className="pointer-events-auto">
                  <AntipodeMarker 
                    wonder={wonder} 
                    onClick={handleWonderSelect} 
                    isSelected={selectedWonder?.id === wonder.id}
                    delayed={true}
                  />
                </div>
              ))}

              {/* Connection lines between wonders and antipodes */}
              {showAntipodes && selectedWonder && (
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
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-wonder-antipode"></div>
            <span className="text-xs">Antipode Point (1A-14A)</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WorldMap;
