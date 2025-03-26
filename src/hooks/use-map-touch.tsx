
import { useRef, useState } from "react";
import { MapTransform } from "./use-map-transform";

interface TouchHandlerParams {
  handlePan: (deltaX: number, deltaY: number) => void;
  handleZoom: (newScale: number, clientX?: number, clientY?: number, containerRect?: DOMRect) => void;
}

export const useMapTouch = ({ handlePan, handleZoom }: TouchHandlerParams) => {
  const [isDragging, setIsDragging] = useState(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const lastTouchDistanceRef = useRef<number | null>(null);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastPositionRef.current = { x: e.clientX, y: e.clientY };
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      lastPositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastPositionRef.current.x;
    const deltaY = e.clientY - lastPositionRef.current.y;
    handlePan(deltaX, deltaY);
    
    lastPositionRef.current = { x: e.clientX, y: e.clientY };
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    const deltaX = e.touches[0].clientX - lastPositionRef.current.x;
    const deltaY = e.touches[0].clientY - lastPositionRef.current.y;
    handlePan(deltaX, deltaY);
    
    lastPositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  
  const handleEnd = () => {
    setIsDragging(false);
  };
  
  // Pinch to zoom handlers
  const handleTouchStartForPinch = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDistanceRef.current = Math.sqrt(dx * dx + dy * dy);
    }
  };
  
  const handleTouchMoveForPinch = (e: React.TouchEvent, containerRect?: DOMRect) => {
    if (e.touches.length === 2 && lastTouchDistanceRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newTouchDistance = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate center point between two fingers
      const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      
      // Calculate scale change
      const scaleFactor = 0.01;
      const scaleChange = (newTouchDistance - lastTouchDistanceRef.current) * scaleFactor;
      const newScale = Math.min(Math.max(containerRect ? 0.5 : 0.5, 4), 4);
      
      handleZoom(newScale + scaleChange, centerX, centerY, containerRect);
      
      lastTouchDistanceRef.current = newTouchDistance;
    }
  };
  
  const handleTouchEndForPinch = () => {
    lastTouchDistanceRef.current = null;
  };

  return {
    isDragging,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleEnd,
      onMouseLeave: handleEnd,
      onTouchStart: (e: React.TouchEvent) => {
        handleTouchStart(e);
        handleTouchStartForPinch(e);
      },
      onTouchMove: (e: React.TouchEvent, containerRect?: DOMRect) => {
        handleTouchMove(e);
        handleTouchMoveForPinch(e, containerRect);
      },
      onTouchEnd: () => {
        handleEnd();
        handleTouchEndForPinch();
      }
    }
  };
};
