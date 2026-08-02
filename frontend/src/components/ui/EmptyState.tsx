import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data found",
  description = "There are no records matching your request.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-[16px] border border-dashed border-border bg-card/50">
      <div className="p-3 bg-muted rounded-full mb-4 text-muted-foreground">
        <FolderOpen className="h-8 w-8" />
      </div>
      <h4 className="text-base font-semibold text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
    </div>
  );
};
