"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import {
  ForgotInput,
  forgotSchema,
  LoginInput,
  loginSchema,
} from "@/lib/validations/auth";
import { useAppDispatch } from "@/hooks/hook";
import { forgotPassword } from "@/lib/store/auth/authSlice";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function ForgotPasswordComponent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInput>({
    resolver: zodResolver(forgotSchema),
  });
  const onSubmit = async (data: ForgotInput) => {
    setIsLoading(true);
    try {
      const result = await dispatch(forgotPassword(data));

      if (result && result.success) {
        toast.success(result.message || "OTP sent to your email!");

        const encodedEmail = encodeURIComponent(data.email);
        router.push(`/auth/otp?email=${encodedEmail}`);
      } else {
        toast.error(result?.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Forgot Password
            </CardTitle>
            <CardDescription>
              Enter your email address and we'll send you an OTP to reset your
              password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Send Reset OTP"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-slate-600">
              Remember your password?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Back to Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
