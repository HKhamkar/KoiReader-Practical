import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import categoriesReducer from "./category/categoriesSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoriesReducer,
  },
});
