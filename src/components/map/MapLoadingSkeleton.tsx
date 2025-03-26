
import { Skeleton } from "../ui/skeleton";

interface MapLoadingSkeletonProps {
  isLoading: boolean;
  type: "world" | "pangea";
}

const MapLoadingSkeleton = ({ isLoading, type }: MapLoadingSkeletonProps) => {
  if (!isLoading) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="animate-pulse text-gray-500">
        Loading {type === "pangea" ? "Pangea" : "world"} map...
      </div>
    </div>
  );
};

export default MapLoadingSkeleton;
