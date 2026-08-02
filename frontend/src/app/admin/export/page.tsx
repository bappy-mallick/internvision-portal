"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { adminService } from "@/services/adminService";
import { toast } from "react-hot-toast";
import { FileSpreadsheet, Download } from "lucide-react";

export default function AdminExportPage() {
  const [downloadingApps, setDownloadingApps] = useState(false);
  const [downloadingPayments, setDownloadingPayments] = useState(false);

  const handleExportApplications = async () => {
    setDownloadingApps(true);
    try {
      const blob = await adminService.exportApplications();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Applicants.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Applicants.xlsx downloaded successfully!");
    } catch (err: any) {
      toast.error("Failed to export applicants Excel report");
      console.error(err);
    } finally {
      setDownloadingApps(false);
    }
  };

  const handleExportPayments = async () => {
    setDownloadingPayments(true);
    try {
      const blob = await adminService.exportPayments();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Payments.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Payments.xlsx downloaded successfully!");
    } catch (err: any) {
      toast.error("Failed to export payments Excel report");
      console.error(err);
    } finally {
      setDownloadingPayments(false);
    }
  };

  return (
    <AdminLayout title="Export Excel Reports">
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-[16px] border border-border">
          <h2 className="text-xl font-bold text-foreground">Excel Data Exporter</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Download production-ready Microsoft Excel (.xlsx) spreadsheets generated dynamically via Apache POI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Export Applications */}
          <Card className="rounded-[20px] border-border bg-card p-6 shadow-sm space-y-6 flex flex-col justify-between">
            <CardHeader className="p-0 space-y-3">
              <div className="h-12 w-12 rounded-[12px] bg-green-100 dark:bg-green-950/60 text-green-600 dark:text-green-400 flex items-center justify-center">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Export Internship Applicants</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  Generates an Excel spreadsheet containing all applicant names, contact info, college, degree, skills, and duration.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 border-t border-border">
              <Button
                onClick={handleExportApplications}
                isLoading={downloadingApps}
                className="w-full h-11 font-semibold bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" /> Download Applicants.xlsx
              </Button>
            </CardContent>
          </Card>

          {/* Card 2: Export Payments */}
          <Card className="rounded-[20px] border-border bg-card p-6 shadow-sm space-y-6 flex flex-col justify-between">
            <CardHeader className="p-0 space-y-3">
              <div className="h-12 w-12 rounded-[12px] bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Export Payment Records</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  Generates an Excel spreadsheet containing payment records, student details, Razorpay Order IDs, Payment IDs, amounts, and statuses.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 border-t border-border">
              <Button
                onClick={handleExportPayments}
                isLoading={downloadingPayments}
                className="w-full h-11 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Download className="h-4 w-4 mr-2" /> Download Payments.xlsx
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
