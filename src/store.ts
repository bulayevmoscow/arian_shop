import { configureStore } from "@reduxjs/toolkit";
import { postsSliceReducer } from "./module/postsList/redux/store";
import { cartSliceReducer } from "./module/cart/redux/store";

export const store = configureStore({
  reducer: {
    postsList: postsSliceReducer,
    cart: cartSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
