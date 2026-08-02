"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, Home } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "REG-987452";
  const order = searchParams.get("order") || "ORD-123456";

  return (
    <Card className="rounded-[24px] border-border bg-card p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xl space-y-6">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/60 dark:text-green-400 animate-bounce">
        <CheckCircle2 className="h-10 w-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Payment Successful!</h1>
        <p className="text-sm text-muted-foreground">
          Thank you for enrolling in InternVision Tech course. Your registration has been confirmed.
        </p>
      </div>

      <div className="bg-muted/50 p-4 rounded-[12px] space-y-2 text-xs font-mono text-left border border-border">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Registration Ref:</span>
          <span className="font-semibold text-foreground">{ref}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Order ID:</span>
          <span className="font-semibold text-foreground">{order}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status:</span>
          <span className="font-semibold text-green-600 dark:text-green-400">PAID & VERIFIED</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link href="/" className="w-full">
          <Button variant="outline" className="w-full">
            <Home className="mr-2 h-4 w-4" /> Go to Home
          </Button>
        </Link>
        <Link href="/internship" className="w-full">
          <Button className="w-full">
            Apply Internship <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <Suspense fallback={<div>Loading confirmation...</div>}>
          <PaymentSuccessContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
