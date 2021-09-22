import { configureStore } from '@reduxjs/toolkit';

import cart from './cart/reducer';

export default configureStore({
  reducer: {
    cart,
  },
});
