
import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Wonder, getAncientWonders, getNewWonders } from "@/utils/wonders";
import { getPangeaCoordinates } from "@/utils/mapCoordinates";
import WonderMarker from "./WonderMarker";
import AntipodeMarker from "./AntipodeMarker";
import WonderCard from "./WonderCard";
import MapControls from "./MapControls";
import MapRenderer from "./map/MapRenderer";
import MapLegend from "./map/MapLegend";

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
                  <line
                    x1={`${((selectedWonder.location.longitude + 180) / 360) * 100}%`}
                    y1={`${((selectedWonder.location.latitude * -1) + 90) / 180 * 100}%`}
                    x2={`${((selectedWonder.antipode.longitude + 180) / 360) * 100}%`}
                    y2={`${((selectedWonder.antipode.latitude * -1) + 90) / 180 * 100}%`}
                    stroke={selectedWonder.type === 'ancient' ? "#3b82f6" : "#10b981"}
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    strokeOpacity="0.4"
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

      {/* Legend Component */}
      <MapLegend showPangea={showPangea} />
    </div>
  );
};

export default WorldMap;
