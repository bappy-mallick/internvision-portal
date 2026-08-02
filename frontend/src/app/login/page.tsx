"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { authService } from "@/services/authService";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@internvision.com");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await authService.login({ email, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify({ email: response.email, name: response.name, role: response.role }));

      toast.success("Welcome back, Administrator!");
      router.push("/admin/dashboard");
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Invalid credentials";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-md rounded-[20px] border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6">
          <CardHeader className="p-0 text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[12px] bg-primary text-primary-foreground shadow-md mb-2">
              <Lock className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Admin Login</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Enter your credentials to access the InternVision Admin Dashboard.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 text-xs font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-[10px] text-center">
                  {error}
                </div>
              )}

              <Input
                label="Admin Email"
                type="email"
                placeholder="admin@internvision.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button type="submit" isLoading={isLoading} className="w-full h-11 text-base font-semibold mt-2">
                Sign In to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
