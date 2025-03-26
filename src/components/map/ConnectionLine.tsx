
import { Wonder } from "@/utils/wonders";

interface ConnectionLineProps {
  selectedWonder: Wonder | null;
  showAntipodes: boolean;
  showPangea: boolean;
}

const ConnectionLine = ({ selectedWonder, showAntipodes, showPangea }: ConnectionLineProps) => {
  if (!selectedWonder || !showAntipodes || showPangea) {
    return null;
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
      <line
        x1={`${((selectedWonder.location.longitude + 180) / 360) * 100}%`}
        y1={`${((selectedWonder.location.latitude * -1) + 90) / 180 * 100}%`}
        x2={`${((selectedWonder.antipode.longitude + 180) / 360) * 100}%`}
        y2={`${((selectedWonder.antipode.latitude * -1) + 90) / 180 * 100}%`}
        stroke={selectedWonder.type === 'ancient' ? "#3b82f6" : "#10b981"}
        strokeWidth="1"
        strokeDasharray="5,5"
        strokeOpacity="0.4"
      />
    </svg>
  );
};

export default ConnectionLine;
