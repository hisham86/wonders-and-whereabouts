
import { Wonder } from "@/utils/wonders";
import { motion } from "framer-motion";

interface ConnectionLineProps {
  selectedWonder: Wonder | null;
  showAntipodes: boolean;
  showPangea: boolean;
}

const ConnectionLine = ({ selectedWonder, showAntipodes, showPangea }: ConnectionLineProps) => {
  if (!selectedWonder || !showAntipodes || showPangea) {
    return null;
  }

  // Get appropriate color based on wonder type
  const lineColor = selectedWonder.type === 'ancient' ? "#3b82f6" : "#10b981";
  
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.9" /> {/* Vivid purple in the middle */}
          <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.8" /> {/* Antipode color at end */}
        </linearGradient>
      </defs>
      
      <motion.line
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        x1={`${((selectedWonder.location.longitude + 180) / 360) * 100}%`}
        y1={`${((selectedWonder.location.latitude * -1) + 90) / 180 * 100}%`}
        x2={`${((selectedWonder.antipode.longitude + 180) / 360) * 100}%`}
        y2={`${((selectedWonder.antipode.latitude * -1) + 90) / 180 * 100}%`}
        stroke="url(#lineGradient)"
        strokeWidth="2"
        strokeDasharray="5,3"
        strokeLinecap="round"
      />
      
      {/* Add glow effect */}
      <motion.line
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
        x1={`${((selectedWonder.location.longitude + 180) / 360) * 100}%`}
        y1={`${((selectedWonder.location.latitude * -1) + 90) / 180 * 100}%`}
        x2={`${((selectedWonder.antipode.longitude + 180) / 360) * 100}%`}
        y2={`${((selectedWonder.antipode.latitude * -1) + 90) / 180 * 100}%`}
        stroke="url(#lineGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        filter="blur(3px)"
      />
    </svg>
  );
};

export default ConnectionLine;
