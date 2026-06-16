import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import API from "@/lib/http";

export interface INotification {
  _id: string;
  user: string;
  title: string;
  message: string;
  isRead: boolean;
  type: "SYSTEM" | "BOOKING" | "PROMO" | "ALERT";
  createdAt: string;
}

interface INotificationState {
  notifications: INotification[];
  unreadCount: number;
  status: Status;
}

const initialState: INotificationState = {
  notifications: [],
  unreadCount: 0,
  status: Status.LOADING,
};

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<INotification[]>) {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.isRead).length;
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    markAsReadLocal(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(
        (n) => n._id === action.payload,
      );
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
  },
});
export const { setNotifications, setStatus, markAsReadLocal } =
  notificationSlice.actions;
export default notificationSlice.reducer;

export function fetchNotification() {
  return async function fetchNotificationThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get("/notification");
      if (response.status === 200) {
        dispatch(setNotifications(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { message: response.data?.message || "Failed" };
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

// make all read
export function makeAllRead() {
  return async function makeAllReadThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.patch("/notification/read-all");
      if (response.status === 200) {
        dispatch(fetchNotification());
        dispatch(setStatus(Status.SUCCESS));
        return { success: true };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { message: response.data?.message || "Failed" };
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
