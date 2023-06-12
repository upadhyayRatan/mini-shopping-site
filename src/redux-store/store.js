import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userReducer";
import productSlice from './productReducer'
export default configureStore({
  reducer: {
    user: userSlice,
    products: productSlice
  },
});
