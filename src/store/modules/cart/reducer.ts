import { Reducer } from 'redux';
import produce from 'immer';

import { CartActions } from './actions';

const INITIAL_STATE: CartState = {
  items: [],
  productsIdWithoutStock: [],
};

const cart: Reducer<CartState> = (state, action) => {
  return produce(state ?? INITIAL_STATE, draft => {
    switch (action.type) {
      case CartActions.addProductToCartSuccess:
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(item => item.product.id === product.id);

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({ product, quantity: 1 });
        }

        break;
      case CartActions.addProductToCartFailure:
        draft.productsIdWithoutStock.push(action.payload.productId);
        break;
      default:
        break;
    }
  });
};

export default cart;
