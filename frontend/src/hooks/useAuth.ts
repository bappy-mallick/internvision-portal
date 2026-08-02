"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export function useAuth(requireAuth = true) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<{ email?: string; name?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = authService.getToken();
    const storedUser = localStorage.getItem("user");

    if (token) {
      setIsAuthenticated(true);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
      if (requireAuth) {
        router.push("/login");
      }
    }
  }, [requireAuth, router]);

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  };

  return { isAuthenticated, user, logout };
}
