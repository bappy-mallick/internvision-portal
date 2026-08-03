"use client";

import React from "react";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Download,
  ExternalLink,
  Code2,
  Server,
  Database,
  Wrench,
  Briefcase,
  Trophy,
  Users,
  Star,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

// Inline brand icons (GitHub & LinkedIn not available in this lucide-react version)
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const skillGroups = [
  {
    label: "Languages",
    icon: Code2,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    skills: ["Java", "C++", "SQL", "JavaScript"],
  },
  {
    label: "Backend",
    icon: Server,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    skills: ["Spring Boot", "REST APIs", "Firebase", "Supabase"],
  },
  {
    label: "Databases",
    icon: Database,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    skills: ["PostgreSQL", "Firestore", "MySQL"],
  },
  {
    label: "Tools & DevOps",
    icon: Wrench,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/40",
    skills: ["Git", "GitHub", "Docker", "Maven", "Postman", "Android Studio"],
  },
];

const projects = [
  {
    title: "InternVision Portal",
    description:
      "A production-deployed full-stack internship and course management platform. Features JWT-secured Spring Boot REST APIs, Razorpay payment integration, Firebase-based student tracking, and a Next.js admin dashboard with real-time application management.",
    tech: ["Spring Boot", "Next.js", "Firebase", "PostgreSQL", "Razorpay", "JWT"],
    github: "https://github.com/bappy-mallick",
  },
  {
    title: "AstraAI",
    description:
      "An AI-powered productivity platform integrating Google Gemini AI for intelligent text generation, summarization, and content assistance. Built with a Spring Boot REST backend and a React frontend for seamless real-time AI interactions.",
    tech: ["Spring Boot", "React", "Gemini AI", "REST APIs", "Firebase"],
    github: "https://github.com/bappy-mallick",
  },
  {
    title: "DeltaCore",
    description:
      "A high-performance backend service platform built on a microservices-inspired architecture. Provides scalable REST API endpoints with PostgreSQL persistence, Docker containerization, and robust error handling for enterprise-grade reliability.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Maven"],
    github: "https://github.com/bappy-mallick",
  },
  {
    title: "E-Commerce Backend",
    description:
      "A production-ready e-commerce backend featuring complete product management, order processing, and user authentication. Implements a clean layered architecture with service, repository, and controller layers following Spring Boot best practices.",
    tech: ["Spring Boot", "PostgreSQL", "REST APIs", "Maven", "Postman"],
    github: "https://github.com/bappy-mallick",
  },
];

const experiences = [
  {
    role: "Java Full Stack Developer Intern",
    company: "InternVision Tech",
    period: "2024 – Present",
    description:
      "Designed and built the complete InternVision Portal from the ground up — a production-deployed platform handling course registrations, Razorpay payment processing, Firebase-based student management, and a Spring Boot REST API backend. Delivered end-to-end features across both the Next.js frontend and the Spring Boot backend.",
    skills: ["Spring Boot", "Next.js", "Firebase", "PostgreSQL", "Razorpay"],
  },
  {
    role: "Android Developer Intern",
    company: "Tech Organization",
    period: "2023",
    description:
      "Developed Android applications using Java and Android Studio. Implemented UI layouts, Firebase Realtime Database integration, and performance optimizations to deliver a smooth mobile user experience.",
    skills: ["Java", "Android Studio", "Firebase", "XML Layouts"],
  },
];

const leadership = [
  {
    title: "Entrepreneurship Lead",
    organization: "College Entrepreneurship Cell",
    description:
      "Led entrepreneurship initiatives and workshops for the student community. Organized startup pitch events, mentored student entrepreneurs, and facilitated industry connections to nurture an innovation-driven culture on campus.",
    icon: Star,
  },
  {
    title: "Internship Coordinator",
    organization: "College Placement Cell",
    description:
      "Coordinated internship opportunities between students and tech companies. Managed application pipelines, organized pre-placement training sessions, and served as the primary liaison for company representatives visiting campus.",
    icon: Users,
  },
];

const achievements = [
  {
    title: "Smart India Hackathon",
    detail: "Grand Finalist",
    icon: "🏆",
    gradient: "from-yellow-400/20 to-amber-400/20",
    border: "border-yellow-400/30",
    textColor: "text-yellow-700 dark:text-yellow-400",
  },
  {
    title: "Young Scientist India",
    detail: "Grand Finalist",
    icon: "🔬",
    gradient: "from-blue-400/20 to-cyan-400/20",
    border: "border-blue-400/30",
    textColor: "text-blue-700 dark:text-blue-400",
  },
  {
    title: "IAPT National Ranking",
    detail: "Top 10% Nationwide",
    icon: "📊",
    gradient: "from-purple-400/20 to-violet-400/20",
    border: "border-purple-400/30",
    textColor: "text-purple-700 dark:text-purple-400",
  },
  {
    title: "Java Certification",
    detail: "Certified Java Developer",
    icon: "☕",
    gradient: "from-orange-400/20 to-red-400/20",
    border: "border-orange-400/30",
    textColor: "text-orange-700 dark:text-orange-400",
  },
  {
    title: "Cloud Computing",
    detail: "Cloud Certified Professional",
    icon: "☁️",
    gradient: "from-sky-400/20 to-blue-400/20",
    border: "border-sky-400/30",
    textColor: "text-sky-700 dark:text-sky-400",
  },
  {
    title: "Full Stack Development",
    detail: "Full Stack Certification",
    icon: "💻",
    gradient: "from-emerald-400/20 to-green-400/20",
    border: "border-emerald-400/30",
    textColor: "text-emerald-700 dark:text-emerald-400",
  },
];

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "bappymallick.dev@gmail.com",
    href: "mailto:bappymallick.dev@gmail.com",
    iconColor: "text-red-500",
    bg: "bg-red-50 dark:bg-red-950/40",
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: "github.com/bappy-mallick",
    href: "https://github.com/bappy-mallick",
    iconColor: "text-foreground",
    bg: "bg-muted/60",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/bappy-mallick",
    href: "https://linkedin.com/in/bappy-mallick",
    iconColor: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "West Bengal, India",
    href: null as string | null,
    iconColor: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
];

// ── Shared Sub-components ─────────────────────────────────────────────────────

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h2 className="text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-foreground">
      {label}
    </span>
  );
}

function PrimaryTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
      {label}
    </span>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-28">
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:text-left lg:gap-16">

            {/* Profile photo */}
            <div className="shrink-0 group">
              <div className="relative">
                {/* Glowing ring */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-primary to-violet-500 opacity-40 blur-lg transition-opacity duration-300 group-hover:opacity-70" />
                {/* Photo container */}
                <div className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-full overflow-hidden border-4 border-background shadow-2xl transition-transform duration-300 group-hover:scale-[1.03]">
                  <Image
                    src="/profilepic.png"
                    alt="Bappy Mallick — Backend Developer"
                    fill
                    sizes="(max-width: 640px) 176px, 208px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Name + title + CTAs */}
            <div className="space-y-5 max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                👋 Open to Opportunities
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
                Bappy{" "}
                <span className="text-primary">Mallick</span>
              </h1>

              <p className="text-xl sm:text-2xl font-semibold text-muted-foreground">
                Backend Developer &amp; Java Full Stack Engineer
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {["Java", "Spring Boot", "Firebase", "PostgreSQL", "Next.js"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-2">
                <a
                  href="/Bappy's resume.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto font-semibold shadow-lg shadow-primary/25"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                </a>
                <a href="mailto:bappymallick.dev@gmail.com">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto font-semibold"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. About ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Bio */}
            <div className="lg:col-span-2 space-y-5">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                About Me
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m{" "}
                <span className="font-semibold text-foreground">Bappy Mallick</span>,
                a Computer Science undergraduate and passionate Backend Developer
                specializing in building scalable, production-ready applications
                with{" "}
                <span className="font-medium text-primary">Java</span>,{" "}
                <span className="font-medium text-primary">Spring Boot</span>, and
                cloud-native technologies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My core expertise lies in designing and implementing robust REST
                APIs, integrating third-party services such as{" "}
                <span className="font-medium text-foreground">Razorpay</span> and{" "}
                <span className="font-medium text-foreground">Firebase</span>, and
                managing relational databases with{" "}
                <span className="font-medium text-primary">PostgreSQL</span>. I
                take a clean, layered-architecture approach to backend
                development — ensuring every system is maintainable, testable, and
                ready for scale.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Beyond pure backend work, I have hands-on experience delivering
                full-stack applications — from Spring Boot APIs to Next.js
                frontends — deployed on cloud platforms. I also bring leadership
                experience as an Entrepreneurship Lead and Internship Coordinator,
                helping bridge the gap between academics and industry.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m driven by the challenge of solving real-world problems
                through clean, efficient engineering and am actively seeking
                opportunities to contribute to impactful product teams.
              </p>
            </div>

            {/* Quick-facts sidebar */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Quick Facts</h3>
              {[
                { label: "Degree", value: "B.Sc. Computer Science" },
                { label: "Specialization", value: "Backend Development" },
                { label: "Primary Stack", value: "Java · Spring Boot" },
                { label: "Cloud", value: "Firebase · Supabase" },
                { label: "Database", value: "PostgreSQL · Firestore" },
                { label: "Location", value: "West Bengal, India" },
                { label: "Status", value: "Open to Opportunities" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-2 text-sm">
                  <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <span className="text-muted-foreground">{label}: </span>
                    <span className="font-medium text-foreground">{value}</span>
                  </span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </section>

      {/* ── 3. Skills ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/30 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Skills & Technologies"
            subtitle="Tools and technologies I work with to build reliable, scalable backend systems."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillGroups.map(({ label, icon: Icon, color, bg, skills }) => (
              <Card
                key={label}
                className="p-6 space-y-4 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-[10px] ${bg}`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground">{label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <TechTag key={skill} label={skill} />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Projects ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Featured Projects"
            subtitle="Production-deployed systems and open-source work I'm proud of."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 hover:scale-[1.01]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-foreground">
                    {project.title}
                  </h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                    className="shrink-0"
                  >
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <GitHubIcon className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.map((t) => (
                    <PrimaryTag key={t} label={t} />
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="w-full mt-1">
                    <ExternalLink className="mr-2 h-3.5 w-3.5" />
                    View on GitHub
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Experience ────────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/30 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Work Experience"
            subtitle="Hands-on engineering experience across backend and mobile development."
          />
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden sm:block" />
            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  {/* Timeline dot */}
                  <div className="shrink-0 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background z-10 shadow-sm">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <Card className="flex-1 p-6 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3 className="font-bold text-foreground">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-primary">
                      {exp.company}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.skills.map((s) => (
                        <TechTag key={s} label={s} />
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Leadership ────────────────────────────────────────────────── */}
      <section className="py-20 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Leadership"
            subtitle="Driving impact beyond code through team leadership and community engagement."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {leadership.map(({ title, organization, description, icon: Icon }) => (
              <Card
                key={title}
                className="p-6 space-y-4 hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-[12px] bg-primary/10 text-primary shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{title}</h3>
                    <p className="text-xs text-primary font-medium mt-0.5">
                      {organization}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Achievements ──────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/30 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Achievements & Certifications"
            subtitle="Recognition from national competitions and professional certifications."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {achievements.map(
              ({ title, detail, icon, gradient, border, textColor }) => (
                <div
                  key={title}
                  className={`relative rounded-[16px] border ${border} bg-gradient-to-br ${gradient} p-5 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:scale-[1.02]`}
                >
                  <span
                    className="text-3xl shrink-0 leading-none"
                    role="img"
                    aria-label={title}
                  >
                    {icon}
                  </span>
                  <div>
                    <p className={`font-bold text-sm ${textColor}`}>{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {detail}
                    </p>
                  </div>
                  <Trophy
                    className={`absolute top-4 right-4 h-4 w-4 opacity-20 ${textColor}`}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── 8. Contact ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Get In Touch"
            subtitle="I'm always open to new opportunities, collaborations, and interesting conversations."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {contactLinks.map(({ icon: Icon, label, value, href, iconColor, bg }) => {
              const card = (
                <Card
                  className={`p-5 flex flex-col items-center gap-3 text-center transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                    href ? "cursor-pointer" : ""
                  }`}
                >
                  <div
                    className={`h-12 w-12 flex items-center justify-center rounded-[12px] ${bg}`}
                  >
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-0.5 break-all">
                      {value}
                    </p>
                  </div>
                </Card>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                >
                  {card}
                </a>
              ) : (
                <div key={label}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. Resume CTA ────────────────────────────────────────────────── */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary-foreground">
              Interested in working together?
            </h2>
            <p className="text-primary-foreground/90 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Download my resume to learn more about my experience, skills, and
              the projects I&apos;ve built.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <a
                href="/Bappy's resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="font-bold text-base px-8 w-full sm:w-auto"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
              </a>
              <a href="mailto:bappymallick.dev@gmail.com">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-bold text-base px-8 w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Send an Email
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
