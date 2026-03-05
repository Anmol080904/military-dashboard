import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasUnreadNotifications: true, // Default to true so dot appears on first load
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.hasUnreadNotifications = false;
    },
    resetNotifications: (state) => {
      state.hasUnreadNotifications = true;
    },
  },
});

export const { clearNotifications, resetNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
