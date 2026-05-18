import API from "@/lib/http";
import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
export interface IBooking {
  _id: string;
  user?: string;
  isGuest: boolean;
  customerFirstName?: string;
  customerLastName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  trackingId: string;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  issueDescription: string;
  deviceImages?: string[];
  currentStatus: string;
  price?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateBooking {
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  issueDescription: string;
  customerFirstName?: string;
  customerLastName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;

  deviceImages?: string[];
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
export function createBooking(data: ICreateBooking, files?: File[]) {
  return async function createBookingThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      if (files?.length) {
        files.forEach((file) => {
          formData.append("deviceImages", file);
        });
      }

      const res = await API.post("/booking", formData);

      const booking = res.data?.data;

      dispatch(addBooking(booking));
      dispatch(setStatus(Status.SUCCESS));

      return {
        success: true,
        data: booking,
        message: res.data?.message,
      };
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));

      return {
        success: false,
        message: err.response?.data?.message || err.message || "Booking failed",
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
