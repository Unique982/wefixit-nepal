import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import API from "@/lib/http";
import Cookies from "js-cookie";
export interface IUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
  token?: string;
}

export interface IRegisterData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  currentAddress: string;
  password?: string;
}

export interface IInitialState {
  user: IUser | null;
  status: Status;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IForget {
  email: string;
}

const initialState: IInitialState = {
  user: null,
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser(state: IInitialState, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;

// --- LOGIN THUNK ---
export function userLogin(data: ILoginData) {
  return async function userLoginThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/login", data);
      if (response.status === 200) {
        const { token, user } = response.data;

        dispatch(
          setUser({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token,
          }),
        );
        localStorage.setItem("token", token);
        const fullName = `${user.firstName} ${user.lastName}`;
        Cookies.set("token", token, { expires: 7, path: "/" });
        Cookies.set("role", user.role, { expires: 7, path: "/" });
        Cookies.set("name", fullName, { expires: 7, path: "/" });
        Cookies.set("email", user.email, { expires: 7, path: "/" });

        dispatch(setStatus(Status.SUCCESS));
        return { success: true, message: "Login successful", user };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data?.message || "Failed" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message || err.message || "Something went wrong";
      return { success: false, message };
    }
  };
}

// --- FORGOT PASSWORD THUNK ---
export function forgotPassword(data: IForget) {
  return async function forgotPasswordThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/forgot-password", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        return {
          success: true,
          message: response.data.message || "OTP Sent Successfully",
        };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data?.message || "Failed" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message || err.message || "Something went wrong";
      return { success: false, message };
    }
  };
}

// --- VERIFY OTP THUNK (यसमा OTP STRING लाई NUMBER बनाइएको छ) ---
export function verifyOtp(data: {
  otp: string | number;
  newPassword?: string;
  confirmNewPassword?: string;
  email: string;
}) {
  return async function verifyOtpThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const payload = {
        email: data.email,
        otp: String(data.otp),
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      };

      const response = await API.post("/auth/reset-password", payload);

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        return {
          success: true,
          message: response.data.message || "Password updated successfully",
        };
      } else {
        dispatch(setStatus(Status.ERROR));
        return {
          success: false,
          message: response.data?.message || "Failed to reset password",
        };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const errorData = err.response?.data?.errors;
      const message =
        err.response?.data?.message ||
        (Array.isArray(errorData) ? errorData.join(", ") : errorData) ||
        err.message ||
        "Something went wrong";
      return { success: false, message };
    }
  };
}

// --- REGISTER THUNK (यहाँ URL सच्याएर /auth/register बनाइएको छ) ---
export function registerUser(data: IRegisterData) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/register", data);

      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        return {
          success: true,
          message: response.data.message || "Registration Successful!",
        };
      } else {
        dispatch(setStatus(Status.ERROR));
        return {
          success: false,
          message: response.data?.message || "Registration failed",
        };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const errorData = err.response?.data?.errors;
      const message =
        err.response?.data?.message ||
        (Array.isArray(errorData) ? errorData.join(", ") : errorData) ||
        err.message ||
        "Something went wrong";
      return { success: false, message };
    }
  };
}
