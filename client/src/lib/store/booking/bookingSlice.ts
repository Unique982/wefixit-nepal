import API from "@/lib/http";
import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
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
export interface IMetaData {
  count: number;
  total: number;
  totalPages: number;
  currentPage: number;
}
export interface IInitialState {
  bookings: IBooking[];
  status: Status;
  meta: IMetaData | null;
}

const initialState: IInitialState = {
  bookings: [],
  status: Status.LOADING,
  meta: null,
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
    setMeta(state: IInitialState, action: PayloadAction<IMetaData>) {
      state.meta = action.payload;
    },
    updateBookingStatus(state: IInitialState, action: PayloadAction<IBooking>) {
      const index = state.bookings.findIndex(
        (b) => b._id === action.payload._id,
      );
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
  },
});
export const {
  setBookings,
  setStatus,
  addBooking,
  setMeta,
  updateBookingStatus,
} = bookingSlice.actions;
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
export function adminCreateBooking(data: ICreateBooking, files?: File[]) {
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

      const res = await APIWITHTOKEN.post("/booking", formData);

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
export function adminViewAllBooking(queryParams?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) {
  return async function adminViewAllBookingThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const res = await APIWITHTOKEN.get("/admin/bookings", {
        params: queryParams,
      });

      const bookings = res.data?.data || [];

      if (res.data?.total) {
        dispatch(
          setMeta({
            count: res.data.count,
            total: res.data.total,
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage,
          }),
        );
      }

      dispatch(setBookings(bookings));
      dispatch(setStatus(Status.SUCCESS));

      return {
        success: true,
        data: bookings,
      };
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      return {
        success: false,
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch admin bookings",
      };
    }
  };
}

// admin booking deatisl single
export function getAdminBookingById(id: string) {
  return async function getAdminBookingByIdThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const res = await APIWITHTOKEN.get(`/admin/guest-bookings/${id}/approve`);
      dispatch(setStatus(Status.SUCCESS));
      return { success: true, data: res.data.data };
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: err.response?.data?.message };
    }
  };
}
// admin booking Status
export function bookingStatusUpdate(
  id: string,
  payload: { status: string; price?: number; notes?: string },
) {
  return async function updateBookingStatusThunk(dispatch: AppDispatch) {
    try {
      const res = await APIWITHTOKEN.patch(
        `/admin/guest-bookings/${id}/approve`,
        payload,
      );
      dispatch(updateBookingStatus(res.data.data));
      return { success: true, data: res.data.data };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message };
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
