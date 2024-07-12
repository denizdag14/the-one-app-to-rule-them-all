import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const TopNavbarSkeleton = (props: Props) => {
  return (
    <div className="bg-gradient-to-r from-yellow-800 to-yellow-600 p-4 shadow-lg">
      <Skeleton className="container mx-auto bg-gradient-to-r flex justify-between items-center">
        <div className="flex items-center">
          <Skeleton className="h-10 w-10 mr-3 bg-yellow-500/30 "></Skeleton>
          <div className="flex flex-col">
            <Skeleton className="h-6 w-32 mb-1 bg-yellow-500/30 "></Skeleton>
            <Skeleton className="h-4 w-10 bg-yellow-500/30"></Skeleton>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-32 mb-1 bg-yellow-500/30 "></Skeleton>
          <Skeleton className="h-6 w-32 mb-1 bg-yellow-500/30 "></Skeleton>
          <Skeleton className="h-6 w-32 mb-1 bg-yellow-500/30 "></Skeleton>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-40 bg-yellow-500/30 rounded-md"></Skeleton>
          <Skeleton className="h-8 w-8 bg-yellow-500/30 rounded-md"></Skeleton>
        </div>
      </Skeleton>
    </div>
  );
};

export default TopNavbarSkeleton;
