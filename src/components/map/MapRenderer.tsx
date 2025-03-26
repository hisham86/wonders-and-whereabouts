
import { useState, useRef, useEffect } from "react";
import { useMapTransform } from "@/hooks/use-map-transform";
import { useMapTouch } from "@/hooks/use-map-touch";
import MapImage from "./MapImage";
import MapZoomControls from "./MapZoomControls";
import MapLoadingSkeleton from "./MapLoadingSkeleton";

interface MapRendererProps {
  showPangea: boolean;
  onMapLoad: () => void;
  onPangeaMapLoad: () => void;
}

const MapRenderer = ({ showPangea, onMapLoad, onPangeaMapLoad }: MapRendererProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [pangeaMapLoaded, setPangeaMapLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { transform, handleZoom, handlePan, resetTransform } = useMapTransform(1);
  
  const { handlers } = useMapTouch({ 
    handlePan,
    handleZoom
  });
  
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
  
  // Handle wheel events for zooming with mouse
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * -0.01;
      const newScale = Math.min(Math.max(transform.scale + delta, 0.5), 4);
      
      const containerRect = container.getBoundingClientRect();
      handleZoom(newScale, e.clientX, e.clientY, containerRect);
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [transform.scale, handleZoom]);

  // Pre-load the images to ensure they're cached
  useEffect(() => {
    const worldMapUrl = "https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg";
    const pangeaMapUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pangaea_continents.svg/1200px-Pangaea_continents.svg.png";
    
    const worldMapImg = new Image();
    worldMapImg.src = worldMapUrl;
    worldMapImg.onload = () => {
      console.log("World map preloaded");
    };
    
    const pangeaMapImg = new Image();
    pangeaMapImg.src = pangeaMapUrl;
    pangeaMapImg.onload = () => {
      console.log("Pangea map preloaded");
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      {...handlers}
      onTouchMove={(e) => handlers.onTouchMove(e, containerRef.current?.getBoundingClientRect())}
    >
      {/* World map image */}
      <MapImage 
        type="world"
        isVisible={!showPangea}
        isLoaded={mapLoaded}
        onLoad={handleMapLoad}
        transform={transform}
      />

      {/* Pangea map image */}
      <MapImage 
        type="pangea"
        isVisible={showPangea}
        isLoaded={pangeaMapLoaded}
        onLoad={handlePangeaMapLoad}
        transform={transform}
      />

      {/* Loading skeleton */}
      <MapLoadingSkeleton 
        isLoading={!mapLoaded || (showPangea && !pangeaMapLoaded)}
        type={showPangea ? "pangea" : "world"}
      />
      
      {/* Map controls */}
      <MapZoomControls
        transform={transform}
        handleZoom={handleZoom}
        resetTransform={resetTransform}
      />
    </div>
  );
};

export default MapRenderer;
