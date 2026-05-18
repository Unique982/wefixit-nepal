"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/hook";
import { OtpInput, otpSchema } from "@/lib/validations/auth";
import { verifyOtp } from "@/lib/store/auth/authSlice";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function OTP() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // १. पहिले useForm Hook लाई Initialize गर्ने
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: "",
      otp: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // २. URL Query Parameters बाट सुरक्षित रूपमा Email तान्ने (केवल एक पटक)
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setValue("email", decodeURIComponent(emailParam));
    }
  }, [searchParams, setValue]);

  // OTP Resend गर्ने Logic
  const handleResendOtp = async () => {
    try {
      setResendTimer(60);
      toast.success("A new OTP has been sent to your email.");

      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  // Form Submit गर्ने Logic
  const onSubmit = async (data: OtpInput) => {
    setIsLoading(true);
    try {
      const result = await dispatch(
        verifyOtp({
          email: data.email,
          otp: data.otp,
          newPassword: data.newPassword,
          confirmNewPassword: data.confirmNewPassword,
        }),
      );

      if (result && result.success) {
        toast.success(
          result.message || "Password updated successfully! Please login.",
        );
        // सिधै Login Page मा पठाउने
        router.push("/auth/login");
      } else {
        toast.error(result?.message || "Invalid OTP or request failed.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Verify OTP
          </CardTitle>
          <CardDescription>
            Enter the 6-digit OTP sent to your email and set your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                readOnly
                {...register("email")}
                className="bg-slate-100"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* OTP Field */}
            <div className="space-y-2">
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                placeholder="123456"
                maxLength={6}
                {...register("otp")}
                className={
                  errors.otp
                    ? "border-red-500 tracking-widest text-center text-lg"
                    : "tracking-widest text-center text-lg"
                }
              />
              {errors.otp && (
                <p className="text-sm text-red-500">{errors.otp.message}</p>
              )}
            </div>

            {/* New Password Field */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword")}
                  className={`pl-10 pr-10 ${errors.newPassword ? "border-red-500" : ""}`}
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3.5 text-gray-400"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.newPassword && (
                <p className="text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmNewPassword")}
                  className={`pl-10 pr-10 ${
                    errors.confirmNewPassword ? "border-red-500" : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmNewPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify & Set Password"}
            </Button>

            {/* Resend OTP Button */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendTimer > 0}
                className="text-sm text-blue-600 hover:underline disabled:text-slate-400 disabled:no-underline font-medium"
              >
                {resendTimer > 0
                  ? `Resend OTP in ${resendTimer}s`
                  : "Resend OTP"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
