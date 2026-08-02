import React from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  iconBgColor?: string;
  iconTextColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  iconBgColor = "bg-blue-100 dark:bg-blue-950",
  iconTextColor = "text-primary",
}) => {
  return (
    <Card className="p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold text-foreground mt-1 tracking-tight">{value}</h3>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className={`p-3.5 rounded-[12px] ${iconBgColor} ${iconTextColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};
