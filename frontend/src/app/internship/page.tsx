"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InternshipForm } from "@/components/forms/InternshipForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { internshipService } from "@/services/internshipService";
import { toast } from "react-hot-toast";

export default function InternshipPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (formData: {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    degree: string;
    skills: string;
    duration: string;
  }) => {
    setIsLoading(true);
    try {
      await internshipService.submitApplication(formData);
      toast.success("Internship application submitted successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
        <Card className="rounded-[20px] border-border bg-card p-6 sm:p-10 shadow-xl">
          <CardHeader className="p-0 pb-6 text-center space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Internship Application Form
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Fill out the details below to apply for InternVision Tech internship program.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <InternshipForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
