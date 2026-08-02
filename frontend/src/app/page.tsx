"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  CheckCircle2,
  BookOpen,
  Award,
  Users,
  ArrowRight,
  Sparkles,
  Clock,
  Tag,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { courseService } from "@/services/courseService";
import { Course } from "@/types";

export default function HomePage() {
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    courseService.getFeaturedCourse().then(setCourse).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      {/* ── 1. Hero Section ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>InternVision Tech Pre-Hire Project</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Bridge the Gap Between <span className="text-primary">Learning</span> & Industry
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Register for specialized software development courses, gain practical experience, and secure guaranteed internship placement opportunities.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto font-semibold shadow-lg shadow-primary/25">
                    Register for Course <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/internship">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold">
                    Apply for Internship
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual Graphic */}
            <div className="relative mx-auto lg:ml-auto max-w-md w-full">
              <div className="absolute -inset-1 rounded-[24px] bg-gradient-to-r from-primary to-blue-400 opacity-30 blur-xl"></div>
              <Card className="relative rounded-[20px] border-border bg-card p-6 shadow-xl space-y-6">
                <div className="flex items-center space-x-4 border-b border-border pb-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-[12px]">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">InternVision Portal</h4>
                    <p className="text-xs text-muted-foreground">Full-Stack Education & Internship</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Industry-curated Java & Spring Boot Curriculum</span>
                  </div>
                  <div className="flex items-start space-x-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Live Razorpay Online Payment Integration</span>
                  </div>
                  <div className="flex items-start space-x-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Direct Internship Track (1, 3, or 6 Months)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                  <span>Verified Certification</span>
                  <span className="font-semibold text-primary">100% Practical</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Featured Course Section ───────────────────────────── */}
      <section id="course" className="py-20 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Training Course</h2>
            <p className="text-muted-foreground mt-2">
              Accelerate your engineering skills with our signature program designed for backend developers.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <Card className="relative overflow-hidden rounded-[20px] border-2 border-primary/30 bg-card p-8 shadow-xl">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-[12px]">
                FEATURED
              </div>

              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {course?.title || "Java Backend Development"}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {course?.description ||
                    "Master Java, Spring Boot, REST APIs, Microservices, and cloud database integrations with hands-on projects."}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0 py-6 border-y border-border space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Duration</span>
                  </div>
                  <span className="font-semibold text-foreground">{course?.duration || "8 Weeks"}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Tag className="h-4 w-4 text-primary" />
                    <span>Registration Fee</span>
                  </div>
                  <span className="text-2xl font-extrabold text-primary">
                    ₹{course?.price ? course.price.toLocaleString("en-IN") : "999"}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-0 pt-6">
                <Link href="/register" className="w-full">
                  <Button className="w-full h-12 text-base font-semibold">
                    Register Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* ── 3. Why Choose Us ─────────────────────────────────────── */}
      <section className="py-20 bg-muted/30 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Why Choose InternVision?</h2>
            <p className="text-muted-foreground mt-2">
              Everything you need to jumpstart your technology career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center space-y-4 hover:shadow-md transition-all">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-[12px] bg-blue-100 dark:bg-blue-950 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Industry Mentors</h3>
              <p className="text-sm text-muted-foreground">
                Learn directly from senior engineers with real-world experience in production applications.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-md transition-all">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-[12px] bg-green-100 dark:bg-green-950 text-green-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Practical Projects</h3>
              <p className="text-sm text-muted-foreground">
                Build full-stack web applications, integrate payment gateways, and work with cloud databases.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-md transition-all">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-[12px] bg-purple-100 dark:bg-purple-950 text-purple-600">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Verified Certification</h3>
              <p className="text-sm text-muted-foreground">
                Receive an official certificate of completion and an internship experience letter.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── 4. Internship Section ───────────────────────────────── */}
      <section id="internship" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[24px] bg-primary p-8 sm:p-12 lg:p-16 text-primary-foreground text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Apply for Internship Program
              </h2>
              <p className="text-primary-foreground/90 text-base sm:text-lg leading-relaxed">
                Gain hands-on software development experience. Choose from 1 Month, 3 Months, or 6 Months internship tracks.
              </p>
              <div className="pt-4">
                <Link href="/internship">
                  <Button variant="secondary" size="lg" className="font-bold text-base px-8">
                    Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
