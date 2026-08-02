import React from "react";
import { Badge } from "@/components/ui/Badge";

interface StatusBadgeProps {
  status: "PENDING" | "SUCCESS" | "FAILED" | string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normalized = status?.toUpperCase() || "PENDING";

  if (normalized === "SUCCESS") {
    return <Badge variant="success">Completed</Badge>;
  }
  if (normalized === "FAILED") {
    return <Badge variant="failed">Failed</Badge>;
  }
  return <Badge variant="pending">Pending</Badge>;
};
