import { api } from "@/lib/api";
import { ApiResponse, PaymentVerifyRequest } from "@/types";

export const paymentService = {
  async verifyPayment(data: PaymentVerifyRequest): Promise<boolean> {
    const response = await api.post<ApiResponse<void>>("/payments/verify", data);
    if (response.data.success) {
      return true;
    }
    throw new Error(response.data.message || "Payment verification failed");
  },
};
