import React from "react";
import { PaymentDto } from "@/types";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";

interface RecentPaymentsTableProps {
  payments: PaymentDto[];
}

export const RecentPaymentsTable: React.FC<RecentPaymentsTableProps> = ({ payments }) => {
  if (payments.length === 0) {
    return <EmptyState title="No recent payments" description="Completed course payments will appear here." />;
  }

  return (
    <div className="w-full overflow-x-auto rounded-[16px] border border-border bg-card">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
          <tr>
            <th className="px-4 py-3">Student</th>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-accent/40 transition-colors">
              <td className="px-4 py-3 font-medium text-foreground">
                <div>{payment.studentName || "Student"}</div>
                <div className="text-xs text-muted-foreground font-normal">{payment.email}</div>
              </td>
              <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                {payment.razorpayOrderId}
              </td>
              <td className="px-4 py-3 font-semibold text-foreground">
                ₹{payment.amount.toLocaleString("en-IN")}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={payment.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
