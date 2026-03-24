import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import bookingSlice from "./booking/bookingSlice";
import trackingSlice from "./tracking/trackingSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    booking: bookingSlice,
    tracking: trackingSlice,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
