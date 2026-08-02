import { api } from "@/lib/api";
import { ApiResponse, RegistrationRequest, RegistrationResponse } from "@/types";

export const registrationService = {
  async register(data: RegistrationRequest): Promise<RegistrationResponse> {
    const response = await api.post<ApiResponse<RegistrationResponse>>("/api/v1/registrations", data);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Failed to initiate registration");
  },
};
