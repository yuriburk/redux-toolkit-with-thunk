import { AxiosResponse } from 'axios';
import { all, call, put, select, takeLeading } from 'redux-saga/effects';

import api from '../../../services/api';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess, CartActions } from './actions';

type CheckProductHasStockRequest = ReturnType<typeof addProductToCartRequest>;

function* checkProductHasStock({ payload }: CheckProductHasStockRequest) {
  const { product } = payload;

  const currentQuantity: number = yield select((state: State) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
  });

  const availableStockResponse: AxiosResponse<{ id: number; quantity: number }> = yield call(
    api.get,
    `stock/${product.id}`,
  );

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([takeLeading(CartActions.addProductToCartRequest, checkProductHasStock)]);
