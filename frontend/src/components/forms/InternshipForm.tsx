"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface InternshipFormProps {
  onSubmit: (data: {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    degree: string;
    skills: string;
    duration: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

export const InternshipForm: React.FC<InternshipFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    skills: "",
    duration: "3 Months",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      errs.phone = "Phone number must be 10 digits";
    }
    if (!formData.college.trim()) errs.college = "College name is required";
    if (!formData.degree.trim()) errs.degree = "Degree is required";
    if (!formData.skills.trim()) errs.skills = "Skills are required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        placeholder="e.g. Bappy Mallick"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        error={errors.fullName}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. bappy@gmail.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="e.g. 9876543210"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
          error={errors.phone}
          maxLength={10}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="College / University"
          placeholder="e.g. JNCT Bhopal"
          value={formData.college}
          onChange={(e) => setFormData({ ...formData, college: e.target.value })}
          error={errors.college}
          required
        />

        <Input
          label="Degree / Branch"
          placeholder="e.g. B.Tech (CSE)"
          value={formData.degree}
          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
          error={errors.degree}
          required
        />
      </div>

      <Input
        label="Technical Skills"
        placeholder="e.g. Java, Spring Boot, React, SQL"
        value={formData.skills}
        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
        error={errors.skills}
        required
      />

      <Select
        label="Internship Duration"
        value={formData.duration}
        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
        options={[
          { value: "1 Month", label: "1 Month (Fast-Track Training)" },
          { value: "3 Months", label: "3 Months (Standard Program)" },
          { value: "6 Months", label: "6 Months (Comprehensive Internship)" },
        ]}
      />

      <Button type="submit" isLoading={isLoading} className="w-full h-12 text-base font-semibold mt-4">
        Submit Internship Application
      </Button>
    </form>
  );
};
