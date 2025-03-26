
import { cn } from "@/lib/utils";
import { Wonder } from "@/utils/wonders";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";

interface WonderMarkerProps {
  wonder: Wonder;
  onClick: (wonder: Wonder) => void;
  isSelected: boolean;
  delayed?: boolean;
  customCoordinates?: {
    longitude: number;
    latitude: number;
  };
}

const WonderMarker = ({ 
  wonder, 
  onClick, 
  isSelected, 
  delayed = false,
  customCoordinates 
}: WonderMarkerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const typeClass = wonder.type === 'ancient' ? 'bg-wonder-ancient' : 'bg-wonder-new';

  const animationDelay = delayed ? 0.2 * wonder.id : 0;
  
  // Use custom coordinates if provided, otherwise use the wonder's location
  const longitude = customCoordinates?.longitude ?? wonder.location.longitude;
  const latitude = customCoordinates?.latitude ?? wonder.location.latitude;

  return (
    <motion.div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
      style={{
        left: `${((longitude + 180) / 360) * 100}%`,
        top: `${((latitude * -1) + 90) / 180 * 100}%`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: animationDelay 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(wonder)}
    >
      <div className={cn(
        "flex items-center justify-center", 
        isSelected ? "scale-125" : "",
      )}>
        <div className={cn(
          "w-4 h-4 rounded-full flex items-center justify-center", 
          typeClass,
          isSelected ? "ring-2 ring-white ring-opacity-70" : "",
          isHovered || isSelected ? "animate-pulse-soft" : ""
        )}>
          <span className="text-white text-[10px] font-bold">{wonder.id}</span>
        </div>
      </div>

      <AnimatePresence>
        {(isHovered || isSelected) && (
          <motion.div 
            className="absolute z-20 top-5 left-1/2 transform -translate-x-1/2 w-max max-w-[180px]"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="glass-panel rounded-lg px-3 py-2 text-center overflow-hidden">
              {wonder.imageUrl && (
                <div className="w-full mb-2">
                  <AspectRatio ratio={16/9} className="rounded-md overflow-hidden">
                    <img 
                      src={wonder.imageUrl} 
                      alt={wonder.name} 
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              )}
              <span className="text-xs font-semibold block truncate">{wonder.name}</span>
              <span className="text-[10px] text-gray-500 block truncate">{wonder.location.name}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WonderMarker;
