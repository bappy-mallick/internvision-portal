import React from "react";

interface SkeletonTableProps {
  rows?: number;
  cols?: number;
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({ rows = 5, cols = 5 }) => {
  return (
    <div className="w-full border border-border rounded-[16px] bg-card overflow-hidden animate-pulse">
      <div className="p-4 bg-muted/40 border-b border-border flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded flex-1" />
        ))}
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="p-4 flex gap-4">
            {Array.from({ length: cols }).map((_, c) => (
              <div key={c} className="h-4 bg-muted/60 rounded flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
