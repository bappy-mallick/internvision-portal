import { api } from "@/lib/api";
import { ApiResponse, Course } from "@/types";

export const courseService = {
  async getFeaturedCourse(): Promise<Course> {
    const response = await api.get<ApiResponse<Course>>("/course");
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    // Fallback if backend is loading/unreachable
    return {
      id: "course001",
      title: "Java Backend Development",
      description: "Master Java, Spring Boot, REST APIs, Microservices, and cloud integrations with real-world projects.",
      price: 999,
      duration: "8 Weeks",
      isActive: true,
    };
  },
};
