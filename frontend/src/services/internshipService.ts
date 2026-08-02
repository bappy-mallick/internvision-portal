import { api } from "@/lib/api";
import { ApiResponse, InternshipApplicationRequest } from "@/types";

export const internshipService = {
  async submitApplication(data: InternshipApplicationRequest): Promise<boolean> {
    const response = await api.post<ApiResponse<void>>("/internships", data);
    if (response.data.success) {
      return true;
    }
    throw new Error(response.data.message || "Failed to submit internship application");
  },
};
