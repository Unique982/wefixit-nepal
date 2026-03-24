"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  X,
  Wrench,
  User,
  Lock,
  Mail,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAppDispatch } from "@/hooks/hook";
import toast, { Toaster } from "react-hot-toast";
import {
  userLogin,
  forgotPassword,
  changePassword,
} from "@/lib/store/auth/authSlice";
import { loginSchema, forgotSchema, resetSchema } from "@/lib/validations/auth";

// --- TYPES & INTERFACES ---
interface ForgotPasswordProps {
  step: number;
  setStep: (step: number) => void;
  setAuthMode: (mode: "login" | "forgot") => void;
  forgotSchema: any;
  resetSchema: any;
  setVerifiedEmail: (email: string) => void;
  verifiedEmail: string;
}

interface AuthModalProps {
  closeModal: () => void;
}

const AuthModal = ({ closeModal }: AuthModalProps) => {
  const dispatch = useAppDispatch();
  const [authMode, setAuthMode] = useState<"login" | "forgot">("login");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: regLogin,
    handleSubmit: handleLogin,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onLoginSubmit = async (data: any) => {
    setLoading(true);
    const result = await dispatch(userLogin(data));
    setLoading(false);
    if (result.success) {
      toast.success("Login Successful!");
      closeModal();
    } else {
      toast.error(result.message || "Invalid credentials");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          {authMode === "login" ? (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-3">
                  <Wrench className="text-[#40C4FF]" size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Log in to manage your repairs
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleLogin(onLoginSubmit)}>
                <div className="space-y-1">
                  <div
                    className={`relative flex items-center border rounded-xl transition-all ${
                      loginErrors.email
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-gray-200 focus-within:ring-2 focus-within:ring-[#40C4FF]"
                    }`}
                  >
                    <User className="absolute left-3 text-gray-400" size={18} />
                    <input
                      type="email"
                      placeholder="Email Address"
                      {...regLogin("email")}
                      className="w-full pl-10 pr-4 py-3.5 bg-transparent outline-none text-sm"
                    />
                  </div>
                  {loginErrors.email && (
                    <p className="text-red-500 text-xs font-medium ml-1">
                      {String(loginErrors.email.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div
                    className={`relative flex items-center border rounded-xl transition-all ${
                      loginErrors.password
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-gray-200 focus-within:ring-2 focus-within:ring-[#40C4FF]"
                    }`}
                  >
                    <Lock className="absolute left-3 text-gray-400" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...regLogin("password")}
                      className="w-full pl-10 pr-10 py-3.5 bg-transparent outline-none text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-gray-400 hover:text-[#40C4FF]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="text-red-500 text-xs font-medium ml-1">
                      {String(loginErrors.password.message)}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setAuthMode("forgot")}
                    className="text-xs font-bold text-[#40C4FF] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#111827] text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-95 disabled:bg-gray-400"
                >
                  {loading ? "AUTHENTICATING..." : "LOGIN NOW"}
                </button>
              </form>
            </>
          ) : (
            <ForgotPasswordComponent
              step={step}
              setStep={setStep}
              setAuthMode={setAuthMode}
              forgotSchema={forgotSchema}
              resetSchema={resetSchema}
              setVerifiedEmail={setVerifiedEmail}
              verifiedEmail={verifiedEmail}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// --- FORGOT PASSWORD SUB-COMPONENT ---
const ForgotPasswordComponent = ({
  step,
  setStep,
  setAuthMode,
  forgotSchema,
  resetSchema,
  setVerifiedEmail,
  verifiedEmail,
}: ForgotPasswordProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const currentSchema = step === 3 ? resetSchema : forgotSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(currentSchema),
    mode: "onChange",
  });

  const handleAction = async (data: any) => {
    setLoading(true);
    if (step === 1) {
      const result = await dispatch(forgotPassword(data));
      if (result.success) {
        toast.success("OTP Sent!");
        setVerifiedEmail(data.email);
        setStep(2);
      } else toast.error(result.message);
    } else {
      const result = await dispatch(
        changePassword({ ...data, email: verifiedEmail }),
      );
      if (result.success) {
        toast.success("Password Updated!");
        setAuthMode("login");
        setStep(1);
      } else toast.error(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="animate-in slide-in-from-right duration-300">
      <button
        onClick={() => {
          setAuthMode("login");
          setStep(1);
        }}
        className="flex items-center text-xs font-bold text-gray-400 hover:text-[#40C4FF] mb-6"
      >
        <ArrowLeft size={14} className="mr-1" /> BACK TO LOGIN
      </button>

      <form onSubmit={handleSubmit(handleAction)} className="space-y-5">
        {step === 1 && (
          <div className="space-y-1">
            <div
              className={`relative flex items-center border rounded-xl transition-all ${
                errors.email
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-200 focus-within:ring-2 focus-within:ring-[#40C4FF]"
              }`}
            >
              <Mail className="absolute left-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                className="w-full pl-10 pr-4 py-3.5 bg-transparent outline-none text-sm"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs font-medium ml-1">
                {String(errors.email.message)}
              </p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Enter the 6-digit OTP sent to your email.
            </p>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="w-full py-3 bg-[#111827] text-white rounded-xl font-bold"
            >
              CONTINUE TO RESET
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <input
                {...register("otp")}
                placeholder="Enter 6-digit OTP"
                className={`w-full p-3.5 border rounded-xl text-sm outline-none ${
                  errors.otp
                    ? "border-red-500"
                    : "border-gray-200 focus:border-[#40C4FF]"
                }`}
              />
              {errors.otp && (
                <p className="text-red-500 text-xs ml-1">
                  {String(errors.otp.message)}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <input
                type="password"
                {...register("newPassword")}
                placeholder="New Password"
                className={`w-full p-3.5 border rounded-xl text-sm outline-none ${
                  errors.newPassword
                    ? "border-red-500"
                    : "border-gray-200 focus:border-[#40C4FF]"
                }`}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs ml-1">
                  {String(errors.newPassword.message)}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className={`w-full p-3.5 border rounded-xl text-sm outline-none ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-200 focus:border-[#40C4FF]"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs ml-1">
                  {String(errors.confirmPassword.message)}
                </p>
              )}
            </div>
          </div>
        )}

        {step !== 2 && (
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#40C4FF] text-[#111827] font-black py-3.5 rounded-xl hover:bg-[#111827] hover:text-white transition-all shadow-md disabled:bg-gray-400"
          >
            {loading
              ? "PROCESSING..."
              : step === 1
                ? "SEND OTP"
                : "UPDATE PASSWORD"}
          </button>
        )}
      </form>
    </div>
  );
};

export default AuthModal;
