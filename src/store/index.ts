import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './features/cart/reducer';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
