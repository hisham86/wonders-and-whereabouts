
import { motion } from "framer-motion";

interface MapLegendProps {
  showPangea: boolean;
}

const MapLegend = ({ showPangea }: MapLegendProps) => {
  return (
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
  );
};

export default MapLegend;
