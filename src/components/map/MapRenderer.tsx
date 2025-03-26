
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useMapTransform } from "@/hooks/use-map-transform";
import { ZoomIn, ZoomOut, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

interface MapRendererProps {
  showPangea: boolean;
  onMapLoad: () => void;
  onPangeaMapLoad: () => void;
}

const MapRenderer = ({ showPangea, onMapLoad, onPangeaMapLoad }: MapRendererProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [pangeaMapLoaded, setPangeaMapLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  
  const { transform, handleZoom, handlePan, resetTransform } = useMapTransform(1);
  
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
  
  // Mouse and touch event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastPositionRef.current = { x: e.clientX, y: e.clientY };
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      lastPositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastPositionRef.current.x;
    const deltaY = e.clientY - lastPositionRef.current.y;
    handlePan(deltaX, deltaY);
    
    lastPositionRef.current = { x: e.clientX, y: e.clientY };
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    const deltaX = e.touches[0].clientX - lastPositionRef.current.x;
    const deltaY = e.touches[0].clientY - lastPositionRef.current.y;
    handlePan(deltaX, deltaY);
    
    lastPositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  
  const handleEnd = () => {
    setIsDragging(false);
  };
  
  // Handle pinch to zoom
  const lastTouchDistanceRef = useRef<number | null>(null);
  
  const handleTouchStartForPinch = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDistanceRef.current = Math.sqrt(dx * dx + dy * dy);
    }
  };
  
  const handleTouchMoveForPinch = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistanceRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newTouchDistance = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate center point between two fingers
      const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      
      // Calculate scale change
      const scaleFactor = 0.01;
      const scaleChange = (newTouchDistance - lastTouchDistanceRef.current) * scaleFactor;
      const newScale = Math.min(Math.max(transform.scale + scaleChange, 0.5), 4);
      
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        handleZoom(newScale, centerX, centerY, containerRect);
      }
      
      lastTouchDistanceRef.current = newTouchDistance;
    }
  };
  
  const handleTouchEndForPinch = () => {
    lastTouchDistanceRef.current = null;
  };

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
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => {
        handleTouchStart(e);
        handleTouchStartForPinch(e);
      }}
      onTouchMove={(e) => {
        handleTouchMove(e);
        handleTouchMoveForPinch(e);
      }}
      onTouchEnd={() => {
        handleEnd();
        handleTouchEndForPinch();
      }}
    >
      {/* World map image */}
      <motion.div 
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: !showPangea && mapLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{
          scale: transform.scale,
          x: transform.x,
          y: transform.y
        }}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg" 
          alt="World Map" 
          className={cn(
            "w-full h-full object-contain transition-opacity duration-1000", 
            !showPangea && mapLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleMapLoad}
          draggable="false"
        />
      </motion.div>

      {/* Pangea map image */}
      <motion.div 
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showPangea && pangeaMapLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{
          scale: transform.scale,
          x: transform.x,
          y: transform.y
        }}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pangaea_continents.svg/1200px-Pangaea_continents.svg.png" 
          alt="Pangea Map" 
          className={cn(
            "w-full h-full object-contain transition-opacity duration-1000", 
            showPangea && pangeaMapLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handlePangeaMapLoad}
          draggable="false"
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
      
      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <Button 
          size="icon" 
          variant="secondary" 
          onClick={() => handleZoom(transform.scale + 0.2)}
          className="bg-white/80 dark:bg-black/50 backdrop-blur-sm"
        >
          <ZoomIn size={18} />
        </Button>
        <Button 
          size="icon" 
          variant="secondary" 
          onClick={() => handleZoom(transform.scale - 0.2)}
          className="bg-white/80 dark:bg-black/50 backdrop-blur-sm"
        >
          <ZoomOut size={18} />
        </Button>
        <Button 
          size="icon" 
          variant="secondary" 
          onClick={resetTransform}
          className="bg-white/80 dark:bg-black/50 backdrop-blur-sm"
        >
          <RefreshCw size={18} />
        </Button>
      </div>
    </div>
  );
};

export default MapRenderer;
