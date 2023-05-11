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
  },
});

export const { userLogIn } = userSlice.actions;
export default userSlice.reducer;
