import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CartState = {
  items: [],
  productsIdWithoutStock: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCartSuccess: (state, action: PayloadAction<Product>) => {
      console.log('success', { state, action });
      const { payload: product } = action;

      const productInCartIndex = state.items.findIndex(item => item.product.id === product.id);

      if (productInCartIndex >= 0) {
        state.items[productInCartIndex].quantity++;
      } else {
        state.items.push({ product, quantity: 1 });
      }
    },
    addProductToCartFailure: (state, action: PayloadAction<number>) => {
      console.log('failure', { state, action });
      const { payload: productId } = action;
      state.productsIdWithoutStock.push(productId);
    },
  },
});

export const { addProductToCartFailure, addProductToCartSuccess } = cartSlice.actions;
export default cartSlice.reducer;
