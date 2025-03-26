
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MapIcon, Globe } from "lucide-react";

interface MapControlsProps {
  showAncient: boolean;
  showNew: boolean;
  showAntipodes: boolean;
  showPangea: boolean;
  onToggleAncient: () => void;
  onToggleNew: () => void;
  onToggleAntipodes: () => void;
  onTogglePangea: () => void;
}

const MapControls = ({ 
  showAncient, 
  showNew, 
  showAntipodes,
  showPangea,
  onToggleAncient, 
  onToggleNew, 
  onToggleAntipodes,
  onTogglePangea
}: MapControlsProps) => {
  return (
    <motion.div 
      className="glass-panel rounded-lg p-3 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex flex-col space-y-4">
        <div>
          <div className="text-xs font-medium uppercase text-gray-500 mb-1">Map Type</div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onTogglePangea}
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-all border flex items-center gap-1.5",
                showPangea
                  ? "bg-amber-500 text-white border-amber-500"
                  : "border-amber-500 text-amber-500 bg-amber-500/10"
              )}
            >
              {showPangea ? <MapIcon size={14} /> : <Globe size={14} />}
              {showPangea ? "Pangea View" : "Modern View"}
            </button>
          </div>
        </div>
        
        <div>
          <div className="text-xs font-medium uppercase text-gray-500 mb-1">Show/Hide Wonders</div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleAncient}
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-all border", 
                showAncient 
                  ? "bg-wonder-ancient text-white border-wonder-ancient" 
                  : "border-wonder-ancient text-wonder-ancient bg-wonder-ancient/10"
              )}
            >
              Ancient Wonders
            </button>
            
            <button
              onClick={onToggleNew}
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-all border", 
                showNew 
                  ? "bg-wonder-new text-white border-wonder-new" 
                  : "border-wonder-new text-wonder-new bg-wonder-new/10"
              )}
            >
              New Wonders
            </button>
            
            <button
              onClick={onToggleAntipodes}
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-all border", 
                showAntipodes 
                  ? "bg-wonder-antipode text-white border-wonder-antipode" 
                  : "border-wonder-antipode text-wonder-antipode bg-wonder-antipode/10"
              )}
            >
              Antipodes
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapControls;
