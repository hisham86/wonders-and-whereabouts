
import { Wonder } from "@/utils/wonders";
import { getPangeaCoordinates } from "@/utils/mapCoordinates";
import WonderMarker from "../WonderMarker";
import AntipodeMarker from "../AntipodeMarker";
import { useMapTransform } from "@/hooks/use-map-transform";

interface MarkerContainerProps {
  visibleWonders: Wonder[];
  showAntipodes: boolean;
  showPangea: boolean;
  selectedWonder: Wonder | null;
  onWonderSelect: (wonder: Wonder) => void;
}

const MarkerContainer = ({
  visibleWonders,
  showAntipodes,
  showPangea,
  selectedWonder,
  onWonderSelect,
}: MarkerContainerProps) => {
  return (
    <div className="relative w-full h-full" style={{ pointerEvents: 'none' }}>
      {/* Wonder markers */}
      {visibleWonders.map(wonder => {
        // Get the appropriate coordinates based on the current map view
        const coordinates = showPangea 
          ? getPangeaCoordinates(wonder)
          : { longitude: wonder.location.longitude, latitude: wonder.location.latitude };
        
        return (
          <div key={wonder.id} style={{ pointerEvents: 'auto' }}>
            <WonderMarker 
              wonder={wonder} 
              onClick={onWonderSelect} 
              isSelected={selectedWonder?.id === wonder.id}
              delayed={true}
              customCoordinates={coordinates}
            />
          </div>
        );
      })}

      {/* Antipode markers - only show on modern map */}
      {showAntipodes && !showPangea && visibleWonders.map(wonder => (
        <div key={`antipode-${wonder.id}`} style={{ pointerEvents: 'auto' }}>
          <AntipodeMarker 
            wonder={wonder} 
            onClick={onWonderSelect} 
            isSelected={selectedWonder?.id === wonder.id}
            delayed={true}
          />
        </div>
      ))}
    </div>
  );
};

export default MarkerContainer;
