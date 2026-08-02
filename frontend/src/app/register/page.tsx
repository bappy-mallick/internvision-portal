"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { courseService } from "@/services/courseService";
import { registrationService } from "@/services/registrationService";
import { paymentService } from "@/services/paymentService";
import { Course, RazorpayOptions } from "@/types";
import { toast } from "react-hot-toast";
import { CheckCircle2, ShieldCheck } from "lucide-react";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

export default function RegisterPage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    courseService.getFeaturedCourse().then(setCourse).catch(console.error);

    // Dynamically load Razorpay Checkout Script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleRegistrationSubmit = async (formData: {
    studentName: string;
    email: string;
    phone: string;
  }) => {
    setIsLoading(true);

    try {
      // 1. Create registration & get Razorpay Order details from backend
      const res = await registrationService.register({
        ...formData,
        courseId: course?.id || "course001",
      });

      toast.success("Registration created! Opening payment gateway...");

      // 2. Configure Razorpay Checkout options
      const options: RazorpayOptions = {
        key: res.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: res.amount,
        currency: res.currency,
        name: "InternVision Tech",
        description: `Registration for ${course?.title || "Java Backend Development"}`,
        order_id: res.orderId,
        prefill: {
          name: formData.studentName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#2563EB",
        },
        handler: async (response) => {
          try {
            toast.loading("Verifying payment with backend...", { id: "verify" });

            await paymentService.verifyPayment({
              registrationId: res.registrationId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            toast.success("Payment Verified Successfully!", { id: "verify" });
            router.push(`/payment-success?ref=${res.registrationId}&order=${response.razorpay_order_id}`);
          } catch (error: any) {
            toast.error(error.message || "Payment verification failed", { id: "verify" });
          }
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            toast.error("Payment modal closed before completion");
          },
        },
      };

      // 3. Open Razorpay Modal (or simulate for test mode if SDK script is blocked)
      if (typeof window !== "undefined" && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback simulation for offline/test environment without CDN
        toast.success("Simulating successful test payment...");
        setTimeout(async () => {
          await paymentService.verifyPayment({
            registrationId: res.registrationId,
            razorpayOrderId: res.orderId,
            razorpayPaymentId: "pay_test_" + Math.random().toString(36).substring(7),
            razorpaySignature: "mock_signature",
          });
          router.push(`/payment-success?ref=${res.registrationId}&order=${res.orderId}`);
        }, 1500);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Course Registration</h1>
          <p className="text-muted-foreground text-sm">
            Complete your registration details below to enroll in our specialized training program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Course Summary Card */}
          <div className="md:col-span-5">
            <Card className="rounded-[16px] border-border bg-card p-6 space-y-4">
              <div className="border-b border-border pb-3">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Selected Course
                </span>
                <CardTitle className="text-xl font-bold text-foreground mt-1">
                  {course?.title || "Java Backend Development"}
                </CardTitle>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-semibold text-foreground">{course?.duration || "8 Weeks"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Fee:</span>
                  <span className="text-lg font-extrabold text-primary">
                    ₹{course?.price ? course.price.toLocaleString("en-IN") : "999"}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-border space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure SSL 256-bit Encrypted Checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Razorpay Test Gateway Mode</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Registration Form */}
          <div className="md:col-span-7">
            <Card className="rounded-[16px] border-border bg-card p-6 sm:p-8">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="text-lg font-bold">Student Details</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <RegistrationForm onSubmit={handleRegistrationSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
