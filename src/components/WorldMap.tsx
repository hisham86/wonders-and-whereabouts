
import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Wonder, getAncientWonders, getNewWonders } from "@/utils/wonders";
import WonderCard from "./WonderCard";
import MapControls from "./MapControls";
import MapRenderer from "./map/MapRenderer";
import MapLegend from "./map/MapLegend";
import MarkerContainer from "./map/MarkerContainer";
import ConnectionLine from "./map/ConnectionLine";
import { useIsMobile } from "@/hooks/use-mobile";

const WorldMap = () => {
  const [selectedWonder, setSelectedWonder] = useState<Wonder | null>(null);
  const [showAncient, setShowAncient] = useState(true);
  const [showNew, setShowNew] = useState(true);
  const [showAntipodes, setShowAntipodes] = useState(true);
  const [showPangea, setShowPangea] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [pangeaMapLoaded, setPangeaMapLoaded] = useState(false);
  const isMobile = useIsMobile();

  const ancientWonders = getAncientWonders();
  const newWonders = getNewWonders();
  
  const handleWonderSelect = useCallback((wonder: Wonder) => {
    setSelectedWonder(prev => prev?.id === wonder.id ? null : wonder);
  }, []);

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
          {/* Map Renderer Component */}
          <MapRenderer 
            showPangea={showPangea}
            onMapLoad={() => setMapLoaded(true)}
            onPangeaMapLoad={() => setPangeaMapLoaded(true)}
          />

          {/* Map overlay with wonders */}
          <div className="absolute inset-0 pointer-events-none">
            <MarkerContainer 
              visibleWonders={visibleWonders}
              showAntipodes={showAntipodes}
              showPangea={showPangea}
              selectedWonder={selectedWonder}
              onWonderSelect={handleWonderSelect}
            />
            
            <ConnectionLine 
              selectedWonder={selectedWonder} 
              showAntipodes={showAntipodes} 
              showPangea={showPangea} 
            />
          </div>

          {/* Selected wonder info panel */}
          <AnimatePresence>
            {selectedWonder && (
              <div className={cn(
                "absolute left-1/2 transform -translate-x-1/2 z-30 px-4",
                isMobile ? "bottom-4 w-full" : "bottom-8 w-full max-w-md"
              )}>
                <WonderCard 
                  wonder={selectedWonder} 
                  onClose={() => setSelectedWonder(null)} 
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend Component */}
      <MapLegend showPangea={showPangea} />
    </div>
  );
};

export default WorldMap;
