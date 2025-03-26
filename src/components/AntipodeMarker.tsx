
import { cn } from "@/lib/utils";
import { Wonder } from "@/utils/wonders";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface AntipodeMarkerProps {
  wonder: Wonder;
  onClick: (wonder: Wonder) => void;
  isSelected: boolean;
  delayed?: boolean;
}

const AntipodeMarker = ({ wonder, onClick, isSelected, delayed = false }: AntipodeMarkerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const animationDelay = delayed ? 0.2 * wonder.id : 0;

  return (
    <motion.div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
      style={{
        left: `${((wonder.antipode.longitude + 180) / 360) * 100}%`,
        top: `${((wonder.antipode.latitude * -1) + 90) / 180 * 100}%`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: animationDelay + 0.2
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
          "w-3 h-3 rounded-full flex items-center justify-center bg-wonder-antipode",
          isSelected ? "ring-2 ring-white ring-opacity-70" : "",
          isHovered || isSelected ? "animate-pulse-soft" : ""
        )}>
          <span className="text-white text-[8px] font-bold">{wonder.id}A</span>
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
            <div className="glass-panel rounded-lg px-3 py-2 text-center">
              <span className="text-xs font-semibold block truncate">{wonder.name} Antipode</span>
              <span className="text-[10px] text-gray-500 block truncate">{wonder.antipode.description}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AntipodeMarker;
