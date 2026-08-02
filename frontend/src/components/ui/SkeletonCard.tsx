import React from "react";

export const SkeletonCard: React.FC = () => {
  return (
    <div className="rounded-[16px] border border-border bg-card p-6 shadow-sm animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-4 w-24 bg-muted rounded-md" />
        <div className="h-8 w-8 bg-muted rounded-full" />
      </div>
      <div className="h-8 w-36 bg-muted rounded-md" />
      <div className="h-3 w-48 bg-muted rounded-md" />
    </div>
  );
};
