import { createSlice } from "@reduxjs/toolkit";

export const catagoryDataSlice = createSlice({
  name: "catagoryData",
  initialState: {
    data: [],
  },
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addData } = catagoryDataSlice.actions;
export default catagoryDataSlice.reducer;
