
import { useState, useCallback } from "react";

export type MapTransform = {
  scale: number;
  x: number;
  y: number;
};

export const useMapTransform = (initialScale = 1) => {
  const [transform, setTransform] = useState<MapTransform>({
    scale: initialScale,
    x: 0,
    y: 0,
  });

  const handleZoom = useCallback((newScale: number, clientX?: number, clientY?: number, containerRect?: DOMRect) => {
    // Ensure scale stays within reasonable limits
    const clampedScale = Math.min(Math.max(newScale, 0.5), 4);
    
    setTransform(prev => {
      // If clientX/Y are provided, zoom toward that point
      if (clientX !== undefined && clientY !== undefined && containerRect) {
        // Calculate the point on the image where the zoom is happening
        const zoomPointX = clientX - containerRect.left - prev.x;
        const zoomPointY = clientY - containerRect.top - prev.y;
        
        // Calculate new position to zoom toward the cursor
        const scaleDiff = clampedScale / prev.scale;
        const newX = clientX - containerRect.left - zoomPointX * scaleDiff;
        const newY = clientY - containerRect.top - zoomPointY * scaleDiff;
        
        return {
          scale: clampedScale,
          x: newX,
          y: newY
        };
      }
      
      // Simple zoom without position adjustment
      return {
        ...prev,
        scale: clampedScale
      };
    });
  }, []);

  const handlePan = useCallback((deltaX: number, deltaY: number) => {
    setTransform(prev => ({
      ...prev,
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
  }, []);

  const resetTransform = useCallback(() => {
    setTransform({
      scale: initialScale,
      x: 0,
      y: 0
    });
  }, [initialScale]);

  return {
    transform,
    handleZoom,
    handlePan,
    resetTransform
  };
};
