"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/common/StatsCard";
import { RecentApplicationsTable } from "@/components/dashboard/RecentApplicationsTable";
import { RecentPaymentsTable } from "@/components/dashboard/RecentPaymentsTable";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { SkeletonTable } from "@/components/ui/SkeletonTable";
import { Modal } from "@/components/ui/Modal";
import { adminService } from "@/services/adminService";
import { ApplicationDto, DashboardStats, PaymentDto } from "@/types";
import { Users, BookOpen, CreditCard, IndianRupee } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentApps, setRecentApps] = useState<ApplicationDto[]>([]);
  const [recentPayments, setRecentPayments] = useState<PaymentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<ApplicationDto | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [statsData, appsData, paymentsData] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getApplications(1, 5),
          adminService.getPayments(1, 5),
        ]);
        setStats(statsData);
        setRecentApps(appsData.content);
        setRecentPayments(paymentsData.content);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="space-y-8">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <StatsCard
                title="Total Applications"
                value={stats?.totalApplications || 0}
                icon={Users}
                description="Submitted internship applications"
                iconBgColor="bg-blue-100 dark:bg-blue-950/60"
                iconTextColor="text-blue-600 dark:text-blue-400"
              />
              <StatsCard
                title="Total Registrations"
                value={stats?.totalRegistrations || 0}
                icon={BookOpen}
                description="Course enrollment attempts"
                iconBgColor="bg-purple-100 dark:bg-purple-950/60"
                iconTextColor="text-purple-600 dark:text-purple-400"
              />
              <StatsCard
                title="Completed Payments"
                value={stats?.completedPayments || 0}
                icon={CreditCard}
                description="Verified successful transactions"
                iconBgColor="bg-green-100 dark:bg-green-950/60"
                iconTextColor="text-green-600 dark:text-green-400"
              />
              <StatsCard
                title="Total Revenue"
                value={`₹${(stats?.totalRevenue || 0).toLocaleString("en-IN")}`}
                icon={IndianRupee}
                description="Total fees collected via Razorpay"
                iconBgColor="bg-amber-100 dark:bg-amber-950/60"
                iconTextColor="text-amber-600 dark:text-amber-400"
              />
            </>
          )}
        </div>

        {/* Recent Activity Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-foreground tracking-tight">Recent Applications</h2>
              <span className="text-xs text-muted-foreground font-medium">Latest 5 submissions</span>
            </div>
            {loading ? (
              <SkeletonTable rows={5} cols={4} />
            ) : (
              <RecentApplicationsTable
                applications={recentApps}
                onView={(app) => setSelectedApp(app)}
              />
            )}
          </div>

          {/* Recent Payments */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-foreground tracking-tight">Recent Payments</h2>
              <span className="text-xs text-muted-foreground font-medium">Latest 5 transactions</span>
            </div>
            {loading ? (
              <SkeletonTable rows={5} cols={4} />
            ) : (
              <RecentPaymentsTable payments={recentPayments} />
            )}
          </div>
        </div>
      </div>

      {/* Applicant Detail Modal */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        title="Applicant Details"
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
                <p className="text-xs text-muted-foreground">Skills</p>
                <p className="font-medium text-xs bg-muted p-2 rounded-md">{selectedApp.skills}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Applied Date</p>
                <p className="font-medium">{new Date(selectedApp.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}
