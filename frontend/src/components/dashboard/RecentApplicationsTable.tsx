import React from "react";
import { ApplicationDto } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

interface RecentApplicationsTableProps {
  applications: ApplicationDto[];
  onView?: (app: ApplicationDto) => void;
}

export const RecentApplicationsTable: React.FC<RecentApplicationsTableProps> = ({
  applications,
  onView,
}) => {
  if (applications.length === 0) {
    return <EmptyState title="No recent applications" description="New internship applications will appear here." />;
  }

  return (
    <div className="w-full overflow-x-auto rounded-[16px] border border-border bg-card">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
          <tr>
            <th className="px-4 py-3">Applicant Name</th>
            <th className="px-4 py-3">College</th>
            <th className="px-4 py-3">Duration</th>
            <th className="px-4 py-3">Skills</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-accent/40 transition-colors">
              <td className="px-4 py-3 font-medium text-foreground">
                <div>{app.fullName}</div>
                <div className="text-xs text-muted-foreground font-normal">{app.email}</div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{app.college}</td>
              <td className="px-4 py-3">
                <Badge variant="outline">{app.duration}</Badge>
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground max-w-[200px] truncate">
                {app.skills}
              </td>
              <td className="px-4 py-3 text-right">
                {onView && (
                  <button
                    onClick={() => onView(app)}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    View
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
