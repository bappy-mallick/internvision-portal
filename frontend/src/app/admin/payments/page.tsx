"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Select } from "@/components/ui/Select";
import { Pagination } from "@/components/common/Pagination";
import { SkeletonTable } from "@/components/ui/SkeletonTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/Button";
import { adminService } from "@/services/adminService";
import { PageResponse, PaymentDto } from "@/types";
import { RefreshCw } from "lucide-react";

export default function AdminPaymentsPage() {
  const [data, setData] = useState<PageResponse<PaymentDto> | null>(null);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPayments = React.useCallback(async (targetPage = page, status = statusFilter) => {
    setLoading(true);
    try {
      const res = await adminService.getPayments(targetPage, 10, status);
      setData(res);
    } catch (err) {
      console.error("Error loading payments:", err);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);


  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };

  return (
    <AdminLayout title="Payment Records">
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card p-4 rounded-[16px] border border-border">
          <div className="w-full sm:w-64">
            <Select
              value={statusFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              options={[
                { value: "", label: "All Payment Statuses" },
                { value: "SUCCESS", label: "Completed (SUCCESS)" },
                { value: "PENDING", label: "Pending Verification" },
                { value: "FAILED", label: "Failed Transactions" },
              ]}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadPayments(page, statusFilter)}
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
            title="No payment records found"
            description={statusFilter ? `No records with status "${statusFilter}".` : "No payment records stored yet."}
          />
        ) : (
          <div className="space-y-4">
            <div className="w-full overflow-x-auto rounded-[16px] border border-border bg-card shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
                  <tr>
                    <th className="px-4 py-3.5">Student</th>
                    <th className="px-4 py-3.5">Amount</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Razorpay Order ID</th>
                    <th className="px-4 py-3.5">Payment ID</th>
                    <th className="px-4 py-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data.content.map((payment) => (
                    <tr key={payment.id} className="hover:bg-accent/40 transition-colors">
                      <td className="px-4 py-3.5 font-medium text-foreground">
                        <div>{payment.studentName}</div>
                        <div className="text-xs text-muted-foreground font-normal">{payment.email}</div>
                      </td>
                      <td className="px-4 py-3.5 font-bold text-foreground">
                        ₹{payment.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={payment.status} />
                      </td>
                      <td className="px-4 py-3.5 text-xs font-mono text-muted-foreground">
                        {payment.razorpayOrderId}
                      </td>
                      <td className="px-4 py-3.5 text-xs font-mono text-muted-foreground">
                        {payment.razorpayPaymentId || "N/A"}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-muted-foreground">
                        {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : "N/A"}
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
    </AdminLayout>
  );
}
