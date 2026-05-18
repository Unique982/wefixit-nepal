import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import API from "@/lib/http";

export interface IBooking {
  _id: string;
  trackingId: string;
  deviceType: string;
  deviceBrand?: string;
  deviceModel: string;
  currentStatus: string;
  createdAt: string;
}

export interface ITimelineEvent {
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITrackingData {
  booking: IBooking;
  timeline: ITimelineEvent[];
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
  status: Status.IDLE,
};

const trackingSlice = createSlice({
  name: "trackingSlice",
  initialState,
  reducers: {
    setTracking(
      state: IInitialState,
      action: PayloadAction<ITrackingData | null>,
    ) {
      state.tracking = action.payload;
    },
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    resetTrackingState(state: IInitialState) {
      state.tracking = null;
      state.status = Status.IDLE;
    },
  },
});

export const { setTracking, setStatus, resetTrackingState } =
  trackingSlice.actions;
export default trackingSlice.reducer;

export function trackRepair(trackingId: string) {
  return async function trackRepairThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`/tracking/${trackingId}`);
      if (response.status === 200 && response.data.success) {
        dispatch(setTracking(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, data: response.data.data };
      } else {
        dispatch(setStatus(Status.ERROR));
        dispatch(setTracking(null));
        return {
          success: false,
          message: response.data?.message || "Failed to fetch data",
        };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      dispatch(setTracking(null));
      const message =
        err.response?.data?.message || err.message || "Something went wrong";
      return { success: false, message };
    }
  };
}

export function updateRepairStatus(trackingId: string, data: IUpdateStatus) {
  return async function updateRepairStatusThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.put(`/tracking/${trackingId}`, data);
      if (response.status === 201 || response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        return {
          success: true,
          message: response.data.message || "Status updated successfully",
          data: response.data.data,
        };
      } else {
        dispatch(setStatus(Status.ERROR));
        return {
          success: false,
          message: response.data?.message || "Failed to update status",
        };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message || err.message || "Something went wrong";
      return { success: false, message };
    }
  };
}
