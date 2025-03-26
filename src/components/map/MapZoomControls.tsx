
import { RefreshCw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "../ui/button";
import { MapTransform } from "@/hooks/use-map-transform";

interface MapZoomControlsProps {
  transform: MapTransform;
  handleZoom: (newScale: number) => void;
  resetTransform: () => void;
}

const MapZoomControls = ({ transform, handleZoom, resetTransform }: MapZoomControlsProps) => {
  return (
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
  );
};

export default MapZoomControls;
