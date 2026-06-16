"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LoginInput, loginSchema } from "@/lib/validations/auth";
import { useAppDispatch } from "@/hooks/hook";
import { userLogin } from "@/lib/store/auth/authSlice";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const responseAction = await dispatch(userLogin(data));

      if (responseAction && responseAction.success) {
        toast.success(
          `Welcome back, ${responseAction.user?.firstName || "User"}!`,
        );

        const role = responseAction.user?.role?.toLowerCase().trim();

        if (role === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/customer/dashboard";
        }
      } else {
        toast.error(responseAction?.message || "Invalid credentials.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md shadow-md border-slate-200/60 bg-white">
        <CardHeader className="space-y-1.5 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome back
          </CardTitle>
          <CardDescription className="text-slate-500 text-sm">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* EMAIL FIELD */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-slate-700 font-medium text-sm"
              >
                Email
              </Label>
              <div className="relative group">
                {/* MAIL ICON - Perfect Vertical Alignment */}
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  className={`pl-10 focus-visible:ring-blue-500 focus-visible:ring-offset-0 ${
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-slate-200"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-medium text-red-500 mt-1 pl-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD FIELD */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-slate-700 font-medium text-sm"
                >
                  Password
                </Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* INPUT WITH ICONS VIRTUAL WRAPPER */}
              <div className="relative group">
                {/* LOCK ICON - Perfect Vertical Alignment */}
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 focus-visible:ring-blue-500 focus-visible:ring-offset-0 ${
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-slate-200"
                  }`}
                />

                {/* EYE TOGGLE - Perfect Vertical Alignment */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm p-0.5 transition-colors"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* ERROR */}
              {errors.password && (
                <p className="text-xs font-medium text-red-500 mt-1 pl-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all active:scale-[0.99] h-10 mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-slate-100 bg-slate-50/50 py-4 rounded-b-xl">
          <p className="text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:text-blue-700 hover:underline font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
