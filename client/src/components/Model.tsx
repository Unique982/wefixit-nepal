"use client";

import { useState, useEffect } from "react";
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
  Phone,
  MapPin,
} from "lucide-react";
import { useAppDispatch } from "@/hooks/hook";
import {
  userLogin,
  forgotPassword,
  verifyOtp,
} from "@/lib/store/auth/authSlice";

import { loginSchema, forgotSchema, otpSchema } from "@/lib/validations/auth";
import { toast } from "sonner";

// --- TYPES & INTERFACES ---
interface ForgotPasswordProps {
  step: number;
  setStep: (step: number) => void;
  setAuthMode: (mode: "login" | "register" | "forgot") => void;
  forgotSchema: any;
  otpSchema: any;
  setVerifiedEmail: (email: string) => void;
  verifiedEmail: string;
}

interface AuthModalProps {
  closeModal: () => void;
}

const AuthModal = ({ closeModal }: AuthModalProps) => {
  const dispatch = useAppDispatch();
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot">(
    "login",
  );
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // React Hook Form for Login
  const {
    register: regLogin,
    handleSubmit: handleLogin,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  // React Hook Form for Registration
  const {
    register: regRegister,
    handleSubmit: handleRegister,
    formState: { errors: registerErrors },
  } = useForm({
    mode: "onChange",
  });

  const onLoginSubmit = async (data: any) => {
    setLoading(true);
    const result = await dispatch(userLogin(data));
    setLoading(false);
    if (result.success) {
      toast.success(result.message || "Login successful");
      closeModal();
    } else {
      toast.error(result.message || "Invalid credentials");
    }
  };

  const onRegisterSubmit = async (data: any) => {
    setLoading(true);
    console.log("Registering account details: ", data);
    setTimeout(() => {
      setLoading(false);
      toast.success("Registration Successful! Please login.");
      setAuthMode("login");
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 max-h-[95vh] flex flex-col">
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X size={24} />
        </button>

        <div
          className="p-8 overflow-y-auto style-scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {/* LOGIN MODE */}
          {authMode === "login" && (
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
                    onClick={() => {
                      setAuthMode("forgot");
                      setStep(1);
                    }}
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

              <div className="text-center mt-6">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setAuthMode("register")}
                    className="text-sm font-bold text-[#40C4FF] hover:underline ml-1"
                  >
                    Register Here
                  </button>
                </p>
              </div>
            </>
          )}

          {/* REGISTER MODE */}
          {authMode === "register" && (
            <div className="animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  Create Account
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Sign up to request and track repair services
                </p>
              </div>

              <form
                className="space-y-4"
                onSubmit={handleRegister(onRegisterSubmit)}
              >
                {/* First Name */}
                <div className="space-y-1">
                  <div className="relative flex items-center border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-[#40C4FF]">
                    <User className="absolute left-3 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      {...regRegister("firstName")}
                      className="w-full pl-10 pr-4 py-3.5 bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-1">
                  <div className="relative flex items-center border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-[#40C4FF]">
                    <User className="absolute left-3 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      {...regRegister("lastName")}
                      className="w-full pl-10 pr-4 py-3.5 bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <div className="relative flex items-center border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-[#40C4FF]">
                    <Mail className="absolute left-3 text-gray-400" size={18} />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      {...regRegister("email")}
                      className="w-full pl-10 pr-4 py-3.5 bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <div className="relative flex items-center border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-[#40C4FF]">
                    <Phone
                      className="absolute left-3 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      required
                      {...regRegister("phoneNumber")}
                      className="w-full pl-10 pr-4 py-3.5 bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Current Address */}
                <div className="space-y-1">
                  <div className="relative flex items-center border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-[#40C4FF]">
                    <MapPin
                      className="absolute left-3 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Current Address"
                      required
                      {...regRegister("currentAddress")}
                      className="w-full pl-10 pr-4 py-3.5 bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <div className="relative flex items-center border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-[#40C4FF]">
                    <Lock className="absolute left-3 text-gray-400" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      {...regRegister("password")}
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
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#111827] text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-95 disabled:bg-gray-400 mt-2"
                >
                  {loading ? "CREATING ACCOUNT..." : "REGISTER NOW"}
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <button
                    onClick={() => setAuthMode("login")}
                    className="text-sm font-bold text-[#40C4FF] hover:underline ml-1"
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* FORGOT PASSWORD MODE */}
          {authMode === "forgot" && (
            <ForgotPasswordComponent
              step={step}
              setStep={setStep}
              setAuthMode={setAuthMode}
              forgotSchema={forgotSchema}
              otpSchema={otpSchema}
              setVerifiedEmail={setVerifiedEmail}
              verifiedEmail={verifiedEmail}
            />
          )}
        </div>
      </div>

      <style jsx global>{`
        .style-scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .style-scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

// --- FORGOT PASSWORD SUB-COMPONENT ---
const ForgotPasswordComponent = ({
  step,
  setStep,
  setAuthMode,
  forgotSchema,
  otpSchema,
  setVerifiedEmail,
  verifiedEmail,
}: ForgotPasswordProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const schema = step === 1 ? forgotSchema : otpSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    reset();
  }, [step, reset]);

  const handleAction = async (data: any) => {
    setLoading(true);
    try {
      if (step === 1) {
        const result = await dispatch(forgotPassword(data));
        if (result.success) {
          toast.success(result.message);
          setVerifiedEmail(data.email);
          setStep(2);
        } else {
          toast.error(result.message);
        }
      } else if (step === 2) {
        const result = await dispatch(
          verifyOtp({
            otp: data.otp,
            newPassword: data.newPassword,
            confirmNewPassword: data.confirmNewPassword,
            email: verifiedEmail,
          }),
        );

        if (result.success) {
          toast.success(result.message);
          setAuthMode("login");
          setStep(1);
        } else {
          toast.error(result.message);
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="animate-in slide-in-from-right duration-300">
      <button
        type="button"
        onClick={() => {
          setAuthMode("login");
          setStep(1);
        }}
        className="flex items-center text-xs font-bold text-gray-400 hover:text-[#40C4FF] mb-6"
      >
        <ArrowLeft size={14} className="mr-1" /> BACK TO LOGIN
      </button>
      {/* मुख्य फिक्स: <form> ट्याग यहाँ सुरु हुन्छ र यस भित्र दुवै स्टेपहरू छन् */}
      <form onSubmit={handleSubmit(handleAction)} className="space-y-5">
        {/* STEP 1 -> ENTER EMAIL */}
        {step === 1 && (
          <div className="animate-in fade-in duration-300 space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-800">
                Forgot Password
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Enter your email to receive a secure recovery code
              </p>
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#40C4FF] text-[#111827] font-black py-3.5 rounded-xl hover:bg-[#111827] hover:text-white transition-all shadow-md disabled:bg-gray-400"
            >
              {loading ? "SENDING..." : "SEND OTP"}
            </button>
          </div>
        )}

        {/* STEP 2 -> OTP + SET PASSWORD COMBINED */}
        {step === 2 && (
          <div className="animate-in fade-in duration-300 space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-800">
                Reset Credentials
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Enter verification token alongside your brand new secure
                password
              </p>
            </div>

            <div className="space-y-1">
              <input
                type="text"
                maxLength={6}
                {...register("otp")}
                placeholder="Enter 6-digit OTP"
                className={`w-full p-3.5 border rounded-xl text-sm outline-none transition-all ${errors.otp ? "border-red-500 ring-1 ring-red-500" : "border-gray-200 focus:border-[#40C4FF] focus:ring-1 focus:ring-[#40C4FF]"}`}
              />
              {errors.otp && (
                <p className="text-red-500 text-xs ml-1 font-medium">
                  {String(errors.otp.message)}
                </p>
              )}
            </div>

            <div className="space-y-1 relative">
              <input
                type={showPass ? "text" : "password"}
                {...register("newPassword")}
                placeholder="New Password (min 8 chars)"
                className={`w-full p-3.5 pr-10 border rounded-xl text-sm outline-none transition-all ${errors.newPassword ? "border-red-500 ring-1 ring-red-500" : "border-gray-200 focus:border-[#40C4FF] focus:ring-1 focus:ring-[#40C4FF]"}`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-4 text-gray-400 hover:text-[#40C4FF]"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.newPassword && (
                <p className="text-red-500 text-xs ml-1 font-medium">
                  {String(errors.newPassword.message)}
                </p>
              )}
            </div>

            {/* यहाँ register("confirmNewPassword") र errors.confirmNewPassword बनाइयो */}
            <div className="space-y-1">
              <input
                type="password"
                {...register("confirmNewPassword")}
                placeholder="Confirm  Password"
                className={`w-full p-3.5 border rounded-xl text-sm outline-none transition-all ${errors.confirmNewPassword ? "border-red-500 ring-1 ring-red-500" : "border-gray-200 focus:border-[#40C4FF] focus:ring-1 focus:ring-[#40C4FF]"}`}
              />
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-xs ml-1 font-medium">
                  {String(errors.confirmNewPassword.message)}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#40C4FF] text-[#111827] font-black py-3.5 rounded-xl hover:bg-[#111827] hover:text-white transition-all shadow-md disabled:bg-gray-400"
            >
              {loading ? "UPDATING..." : "UPDATE PASSWORD"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
export default AuthModal;
