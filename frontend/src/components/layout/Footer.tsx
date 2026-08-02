import React from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card text-card-foreground transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-primary text-primary-foreground">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                Intern<span className="text-primary">Vision</span> Portal
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-sm">
              Empowering students with industry-grade software development skills and practical internship opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center space-x-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/#course" className="hover:text-foreground transition-colors">
              Course
            </Link>
            <Link href="/internship" className="hover:text-foreground transition-colors">
              Apply Internship
            </Link>
            <Link href="/login" className="hover:text-foreground transition-colors">
              Admin Login
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} InternVision Tech. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built with Spring Boot & Next.js</p>
        </div>
      </div>
    </footer>
  );
};
