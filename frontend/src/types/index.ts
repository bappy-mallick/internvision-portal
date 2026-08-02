/**
 * InternVision Portal — TypeScript Type Definitions
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  isActive: boolean;
  createdAt?: string;
}

export interface RegistrationRequest {
  studentName: string;
  email: string;
  phone: string;
  courseId: string;
}

export interface RegistrationResponse {
  registrationId: string;
  orderId: string;
  amount: number; // in paise
  currency: string;
  keyId: string;
}

export interface PaymentVerifyRequest {
  registrationId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface InternshipApplicationRequest {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  skills: string;
  duration: "1 Month" | "3 Months" | "6 Months" | string;
}

export interface ApplicationDto {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  skills: string;
  duration: string;
  createdAt: string;
}

export interface PaymentDto {
  id: string;
  registrationId: string;
  studentName: string;
  email: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  paidAt: string;
}

export interface DashboardStats {
  totalApplications: number;
  totalRegistrations: number;
  completedPayments: number;
  totalRevenue: number;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  name: string;
  role: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}
