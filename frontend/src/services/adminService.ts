import { api } from "@/lib/api";
import { ApiResponse, ApplicationDto, DashboardStats, PageResponse, PaymentDto } from "@/types";

export const adminService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get<ApiResponse<DashboardStats>>("/api/v1/admin/dashboard");
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    return {
      totalApplications: 0,
      totalRegistrations: 0,
      completedPayments: 0,
      totalRevenue: 0,
    };
  },

  async getApplications(page = 1, size = 10, search = ""): Promise<PageResponse<ApplicationDto>> {
    const response = await api.get<ApiResponse<PageResponse<ApplicationDto>>>("/api/v1/admin/applications", {
      params: { page, size, search },
    });
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    return {
      content: [],
      page,
      size,
      totalElements: 0,
      totalPages: 1,
      last: true,
    };
  },

  async getApplicationById(id: string): Promise<ApplicationDto> {
    const response = await api.get<ApiResponse<ApplicationDto>>(`/api/v1/admin/applications/${id}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error("Application not found");
  },

  async getPayments(page = 1, size = 10, status = ""): Promise<PageResponse<PaymentDto>> {
    const response = await api.get<ApiResponse<PageResponse<PaymentDto>>>("/api/v1/admin/payments", {
      params: { page, size, status },
    });
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    return {
      content: [],
      page,
      size,
      totalElements: 0,
      totalPages: 1,
      last: true,
    };
  },

  async getPaymentById(id: string): Promise<PaymentDto> {
    const response = await api.get<ApiResponse<PaymentDto>>(`/api/v1/admin/payments/${id}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error("Payment not found");
  },

  async exportApplications(): Promise<Blob> {
    const response = await api.get("/api/v1/admin/export/applications", {
      responseType: "blob",
    });
    return response.data;
  },

  async exportPayments(): Promise<Blob> {
    const response = await api.get("/api/v1/admin/export/payments", {
      responseType: "blob",
    });
    return response.data;
  },
};
