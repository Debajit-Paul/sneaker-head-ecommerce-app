import { createSlice } from "@reduxjs/toolkit";
import { userLogOut as LogOut } from "./userSlice";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isshowCart: false,
    items: [],
  },
  reducers: {
    showCart: (state) => {
      state.isshowCart = !state.isshowCart;
    },
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    },
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item._id === _id);
      itemToUpdate.quantity = quantity;
    },
    resetCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LogOut, (state) => {
      state.isshowCart = false;
      state.items = [];
    });
  },
});

export const { showCart, addItem, removeItem, updateQuantity, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
