import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import API from "@/lib/http";
export interface IUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
  token?: string;
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

export interface IOtp {
  email: string;
  otp: number;
}
export interface IChangePassword {
  email: string;
  password: string;
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
export function userLogin(data: ILoginData) {
  return async function userLoginThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/login", data);
      if (response.status === 200) {
        const { token, user } = response.data;
        dispatch(
          setUser({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token,
          }),
        );

        localStorage.setItem("token", token);

        dispatch(setStatus(Status.SUCCESS));
        return { success: true, user };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data?.message || "Failed" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message ||
        err.message ||
        err.response?.data?.errors ||
        "Something went wrong";
      return { success: false, message };
    }
  };
}
export function forgotPassword(data: IForget) {
  return async function forgotPasswordThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/forgot-password", data);

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, message: response.data.message };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data?.message || "Failed" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message ||
        err.message ||
        err.response?.data?.errors ||
        "Something went wrong";
      return { success: false, message };
    }
  };
}
export function verifyOtp(data: IOtp & { password?: string }) {
  return async function verifyOtpThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/verify-otp", data);

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, message: response.data.message };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data?.message || "Failed" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message ||
        err.message ||
        err.response?.data?.errors ||
        "Something went wrong";
      return { success: false, message };
    }
  };
}

export function changePassword(data: IChangePassword & { otp?: number }) {
  return async function changePasswordThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/reset-password", data);

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, message: response.data.message };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data?.message || "Failed" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message ||
        err.message ||
        err.response?.data?.errors ||
        "Something went wrong";
      return { success: false, message };
    }
  };
}
