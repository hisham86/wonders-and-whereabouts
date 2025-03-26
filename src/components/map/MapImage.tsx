
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MapTransform } from "@/hooks/use-map-transform";

interface MapImageProps {
  type: "world" | "pangea";
  isVisible: boolean;
  isLoaded: boolean;
  onLoad: () => void;
  transform: MapTransform;
}

const MapImage = ({ type, isVisible, isLoaded, onLoad, transform }: MapImageProps) => {
  const src = type === "world" 
    ? "https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg"
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pangaea_continents.svg/1200px-Pangaea_continents.svg.png";
    
  return (
    <motion.div 
      className="absolute inset-0 w-full h-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{
        scale: transform.scale,
        x: transform.x,
        y: transform.y
      }}
    >
      <img 
        src={src} 
        alt={type === "world" ? "World Map" : "Pangea Map"}
        className={cn(
          "max-w-full max-h-full object-contain",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={onLoad}
        draggable="false"
        style={{ transition: "opacity 0.5s ease-in-out" }}
      />
    </motion.div>
  );
};

export default MapImage;
