import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./feature/cartSlice";
import categoryDataSlice from "./feature/categoryDataSlice";
import userSlice from "./feature/userSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    category: categoryDataSlice,
    user: userSlice,
  },
});
