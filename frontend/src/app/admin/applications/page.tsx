"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { SearchBar } from "@/components/common/SearchBar";
import { Pagination } from "@/components/common/Pagination";
import { SkeletonTable } from "@/components/ui/SkeletonTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { adminService } from "@/services/adminService";
import { ApplicationDto, PageResponse } from "@/types";
import { RefreshCw, Eye } from "lucide-react";

export default function AdminApplicationsPage() {
  const [data, setData] = useState<PageResponse<ApplicationDto> | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<ApplicationDto | null>(null);

  const loadApplications = React.useCallback(async (targetPage = page, query = search) => {
    setLoading(true);
    try {
      const res = await adminService.getApplications(targetPage, 10, query);
      setData(res);
    } catch (err) {
      console.error("Error loading applications:", err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);


  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  return (
    <AdminLayout title="Internship Applications">
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card p-4 rounded-[16px] border border-border">
          <SearchBar
            placeholder="Search applicant name, email, college, skills..."
            onSearch={handleSearch}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadApplications(page, search)}
            isLoading={loading}
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </div>

        {/* Table / Empty / Skeleton State */}
        {loading ? (
          <SkeletonTable rows={10} cols={6} />
        ) : !data || data.content.length === 0 ? (
          <EmptyState
            title="No applications found"
            description={search ? `No records match "${search}". Try adjusting your search query.` : "No internship applications submitted yet."}
          />
        ) : (
          <div className="space-y-4">
            <div className="w-full overflow-x-auto rounded-[16px] border border-border bg-card shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
                  <tr>
                    <th className="px-4 py-3.5">Applicant</th>
                    <th className="px-4 py-3.5">College</th>
                    <th className="px-4 py-3.5">Degree</th>
                    <th className="px-4 py-3.5">Duration</th>
                    <th className="px-4 py-3.5">Applied Date</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data.content.map((app) => (
                    <tr key={app.id} className="hover:bg-accent/40 transition-colors">
                      <td className="px-4 py-3.5 font-medium text-foreground">
                        <div>{app.fullName}</div>
                        <div className="text-xs text-muted-foreground font-normal">{app.email}</div>
                        <div className="text-[11px] text-muted-foreground font-normal sm:hidden">{app.phone}</div>
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground">{app.college}</td>
                      <td className="px-4 py-3.5 text-muted-foreground">{app.degree}</td>
                      <td className="px-4 py-3.5">
                        <Badge variant="outline">{app.duration}</Badge>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-muted-foreground">
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedApp(app)}
                          className="h-8 px-2.5 text-xs text-primary"
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" /> View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              totalElements={data.totalElements}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        )}
      </div>

      {/* Applicant Detail Modal */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        title="Application Details"
      >
        {selectedApp && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-3 bg-muted/40 p-4 rounded-[12px] border border-border">
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-semibold">{selectedApp.fullName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-semibold">{selectedApp.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-semibold">{selectedApp.phone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-semibold text-primary">{selectedApp.duration}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">College / University</p>
                <p className="font-medium">{selectedApp.college}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Degree / Branch</p>
                <p className="font-medium">{selectedApp.degree}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Technical Skills</p>
                <p className="font-medium text-xs bg-muted p-2.5 rounded-md mt-1">{selectedApp.skills}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Submitted At</p>
                <p className="font-medium">{selectedApp.createdAt ? new Date(selectedApp.createdAt).toLocaleString() : "N/A"}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}
