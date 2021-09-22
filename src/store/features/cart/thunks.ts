import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../..';
import api from '../../../services/api';
import { addProductToCartFailure, addProductToCartSuccess } from './reducer';

export const checkProductHasStock = createAsyncThunk<void, Product>(
  'stock/productId',
  async (product, { getState, dispatch }) => {
    const state = getState() as RootState;
    console.log({ product, state });

    const currentQuantity = state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;

    const availableStockResponse = await api.get<{ id: number; quantity: number }>(`stock/${product.id}`);

    if (availableStockResponse.data.quantity > currentQuantity) {
      console.log('success dispatch', dispatch);
      dispatch(addProductToCartSuccess(product));
    } else {
      dispatch(addProductToCartFailure(product.id));
    }
  },
);
