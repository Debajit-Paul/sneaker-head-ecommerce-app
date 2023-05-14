import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
  },
  reducers: {
    userLogIn: (state, action) => {
      state.userInfo = action.payload;
    },
    userLogOut: (state) => {
      state.userInfo = null;
    },
  },
});

export const { userLogIn, userLogOut } = userSlice.actions;
export default userSlice.reducer;
