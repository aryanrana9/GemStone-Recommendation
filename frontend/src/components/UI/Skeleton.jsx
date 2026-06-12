import React from 'react';

export const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-slate-800/50 rounded-md ${className}`} />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="glass p-6 rounded-2xl flex flex-col gap-4 w-full">
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 mt-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
};

export const TableSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
};
