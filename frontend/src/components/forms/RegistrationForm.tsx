"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface RegistrationFormProps {
  onSubmit: (data: { studentName: string; email: string; phone: string }) => Promise<void>;
  isLoading?: boolean;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.studentName.trim()) {
      errs.studentName = "Name is required";
    }
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      errs.phone = "Phone number must be exactly 10 digits";
    }
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
        label="Student Full Name"
        placeholder="e.g. Rahul Sharma"
        value={formData.studentName}
        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
        error={errors.studentName}
        required
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="e.g. rahul@gmail.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        required
      />

      <Input
        label="Phone Number (10 Digits)"
        type="tel"
        placeholder="e.g. 9876543210"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
        error={errors.phone}
        maxLength={10}
        required
      />

      <Button type="submit" isLoading={isLoading} className="w-full h-12 text-base font-semibold mt-2">
        Proceed to Payment (₹999)
      </Button>
    </form>
  );
};
