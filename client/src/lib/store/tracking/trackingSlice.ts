import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import API from "@/lib/http";

export interface ITrackingEvent {
  status: string;
  description: string;
  updatedAt: string;
  updatedBy: string;
  notes?: string;
}

export interface ITrackingData {
  _id: string;
  bookingId: string;
  trackingId: string;
  currentStatus: string;
  timeline: ITrackingEvent[];
}

export interface IInitialState {
  tracking: ITrackingData | null;
  status: Status;
}
export interface IUpdateStatus {
  status: string;
  notes?: string;
}
const initialState: IInitialState = {
  tracking: null,
  status: Status.LOADING,
};
const trackingSlice = createSlice({
  name: "trackingSlice",
  initialState,
  reducers: {
    setTracking(state: IInitialState, action: PayloadAction<ITrackingData>) {
      state.tracking = action.payload;
    },
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});
export const { setTracking, setStatus } = trackingSlice.actions;
export default trackingSlice.reducer;
// track periar
export function trackRepair(trackingId: string) {
  return async function trackRepairThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`/tracking/${trackingId}`);
      if (response.status === 200) {
        dispatch(setTracking(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, data: response.data.data };
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

// Update Repair Status (Admin/Tech)
export function updateRepairStatus(bookingId: string, data: IUpdateStatus) {
  return async function updateRepairStatusThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.put(`/tracking/${bookingId}/status`, data);
      if (response.status === 201) {
        dispatch(setTracking(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return {
          success: true,
          message: response.data.message,
          data: response.data.data,
        };
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
