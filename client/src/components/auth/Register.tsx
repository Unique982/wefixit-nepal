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
  RegisterInput,
  registerSchema,
} from "@/lib/validations/auth";
import { useAppDispatch } from "@/hooks/hook";
import { forgotPassword, registerUser } from "@/lib/store/auth/authSlice";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, MapPin, Phone, User } from "lucide-react";
export default function RegisterComponents() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      const result = await dispatch(registerUser(data));

      if (result && result.success) {
        toast.success(
          result.message || "Registration successful! Please login.",
        );
        router.push("/auth/login");
      } else {
        toast.error(
          result?.message || "Registration failed. Please try again.",
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-lg shadow-md border-slate-200/60">
        <CardHeader className="space-y-1.5 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Create an account
          </CardTitle>
          <CardDescription className="text-slate-500">
            Enter your details to register for WeFixIt Nepal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* FIRST NAME & LAST NAME GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-slate-700 font-medium"
                >
                  First Name
                </Label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    {...register("firstName")}
                    className={`pl-10 focus-visible:ring-blue-500 ${
                      errors.firstName
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-slate-200"
                    }`}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-xs font-medium text-red-500 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-slate-700 font-medium"
                >
                  Last Name
                </Label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    {...register("lastName")}
                    className={`pl-10 focus-visible:ring-blue-500 ${
                      errors.lastName
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-slate-200"
                    }`}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-xs font-medium text-red-500 mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* EMAIL FIELD */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  className={`pl-10 focus-visible:ring-blue-500 ${
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-slate-200"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PHONE NUMBER FIELD */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700 font-medium">
                Phone Number
              </Label>
              <div className="relative group">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="phone"
                  placeholder="9800000000"
                  {...register("phone")}
                  className={`pl-10 focus-visible:ring-blue-500 ${
                    errors.phone
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-slate-200"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* CURRENT ADDRESS FIELD */}
            <div className="space-y-2">
              <Label
                htmlFor="currentAddress"
                className="text-slate-700 font-medium"
              >
                Current Address
              </Label>
              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="currentAddress"
                  placeholder="Kathmandu, Nepal"
                  {...register("currentAddress")}
                  className={`pl-10 focus-visible:ring-blue-500 ${
                    errors.currentAddress
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-slate-200"
                  }`}
                />
              </div>
              {errors.currentAddress && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {errors.currentAddress.message}
                </p>
              )}
            </div>

            {/* PASSWORD FIELD WITH SHOW/HIDE */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">
                Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={`pl-10 pr-10 focus-visible:ring-blue-500 ${
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-slate-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all active:scale-[0.99] mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>

        {/* FOOTER */}
        <CardFooter className="flex justify-center border-t border-slate-100 bg-slate-50/50 py-4 rounded-b-xl">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-700 hover:underline font-semibold transition-colors"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
