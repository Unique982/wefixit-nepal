import API from "@/lib/http";
import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

export interface IBooking {
  _id: string;
  deviceType: string;
  deviceModel: string;
  issueDescription?: string;
  currentStatus: string;
  status: string;
  trackingId: string;
  createdAt: string;
}
export interface ICreateBooking {
  deviceType: string;
  deviceModel: string;
  issueDescription: string;
}

export interface IInitialState {
  bookings: IBooking[];
  status: Status;
}
const initialState: IInitialState = {
  bookings: [],
  status: Status.LOADING,
};
const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    setBookings(state: IInitialState, action: PayloadAction<IBooking[]>) {
      state.bookings = action.payload;
    },
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    addBooking(state: IInitialState, action: PayloadAction<IBooking>) {
      state.bookings.unshift(action.payload);
    },
  },
});
export const { setBookings, setStatus, addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;

// create Booking
export function createBooking(data: ICreateBooking) {
  return async function createBookingThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/bookings", data);
      if (response.status === 201 || response.status === 200) {
        const newBooking = response.data.data || response.data;
        dispatch(addBooking(newBooking));
        dispatch(setStatus(Status.SUCCESS));
        return {
          success: true,
          message: response.data.message || "Booking Successful",
          data: newBooking,
        };
      }
      return { success: false, message: "Unexpected response" };
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      return {
        success: false,
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to create booking",
      };
    }
  };
}

// Get My Bookings
export function getMyBookings() {
  return async function getMyBookingsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get("/bookings");
      const bookings = response.data.data || response.data;
      dispatch(setBookings(bookings));
      dispatch(setStatus(Status.SUCCESS));
      return { success: true, data: bookings };
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      return {
        success: false,
        message: err.response?.data?.message || "Failed to fetch bookings",
      };
    }
  };
}
export function downloadInvoice(bookingId: string) {
  return async function downloadInvoiceThunk() {
    try {
      const response = await API.get(`/bookings/${bookingId}/invoice`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      return { success: true };
    } catch (err: any) {
      return { success: false, message: "Could not download invoice" };
    }
  };
}
