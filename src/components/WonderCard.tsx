
import { cn } from "@/lib/utils";
import { Wonder, getHumanReadableCoordinates } from "@/utils/wonders";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";

interface WonderCardProps {
  wonder: Wonder;
  onClose: () => void;
}

const WonderCard = ({ wonder, onClose }: WonderCardProps) => {
  const isMobile = useIsMobile();
  
  const typeClass = wonder.type === 'ancient' 
    ? 'border-wonder-ancient' 
    : 'border-wonder-new';
  
  const typeText = wonder.type === 'ancient' 
    ? 'Ancient Wonder' 
    : 'New Wonder';

  return (
    <motion.div 
      className={cn(
        "glass-panel rounded-xl border-2 overflow-hidden",
        isMobile ? "w-[85%] max-h-[250px] overflow-y-auto" : "w-full max-w-md",
        typeClass
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <div className="flex justify-between items-start p-3">
        <div className="flex items-center space-x-2">
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center text-white",
            wonder.type === 'ancient' ? 'bg-wonder-ancient' : 'bg-wonder-new'
          )}>
            <span className="font-bold text-sm">{wonder.id}</span>
          </div>
          <div>
            <h3 className="font-bold text-base leading-tight">{wonder.name}</h3>
            <div className="flex items-center space-x-2">
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                wonder.type === 'ancient' ? 'bg-wonder-ancient/10 text-wonder-ancient' : 'bg-wonder-new/10 text-wonder-new'
              )}>
                {typeText}
              </span>
              <span className="text-xs text-gray-500">{wonder.location.name}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {isMobile ? (
        <div className="p-3 pt-0 text-xs">
          <p className="mb-2 line-clamp-2">{wonder.description}</p>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="font-medium uppercase text-gray-500">Location</div>
              <div>{getHumanReadableCoordinates(wonder.location.latitude, wonder.location.longitude)}</div>
            </div>
            <div>
              <div className="font-medium uppercase text-gray-500">Antipode</div>
              <div>{getHumanReadableCoordinates(wonder.antipode.latitude, wonder.antipode.longitude)}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 pt-0">
          <p className="text-sm mb-4">{wonder.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-xs font-medium uppercase text-gray-500">Original Location</div>
              <div className="text-sm">{getHumanReadableCoordinates(wonder.location.latitude, wonder.location.longitude)}</div>
              <div className="text-xs">{wonder.location.name}</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-medium uppercase text-gray-500">Antipode</div>
              <div className="text-sm">{getHumanReadableCoordinates(wonder.antipode.latitude, wonder.antipode.longitude)}</div>
              <div className="text-xs">{wonder.antipode.description}</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WonderCard;
