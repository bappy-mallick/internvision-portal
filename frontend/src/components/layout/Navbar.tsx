"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary text-primary-foreground shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Intern<span className="text-primary">Vision</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:space-x-8 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/#course" className="hover:text-foreground transition-colors">
            Featured Course
          </Link>
          <Link href="/#internship" className="hover:text-foreground transition-colors">
            Internships
          </Link>
          <Link href="/login" className="hover:text-foreground transition-colors">
            Admin Portal
          </Link>
          <Link href="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
        </div>

        {/* Right CTA Actions */}
        <div className="hidden md:flex md:items-center md:space-x-3">
          <ThemeToggle />
          <Link href="/internship">
            <Button variant="outline" size="sm">
              Apply Internship
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">
              Register Course
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-foreground hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/#course"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-foreground hover:text-primary"
          >
            Featured Course
          </Link>
          <Link
            href="/#internship"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-foreground hover:text-primary"
          >
            Internships
          </Link>
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-foreground hover:text-primary"
          >
            Admin Portal
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-foreground hover:text-primary"
          >
            About
          </Link>
          <div className="pt-2 flex flex-col space-y-2">
            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full">Register Course</Button>
            </Link>
            <Link href="/internship" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                Apply Internship
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
