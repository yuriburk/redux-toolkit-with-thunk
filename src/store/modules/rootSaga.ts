import { all } from 'redux-saga/effects';

import cart from './cart/sagas';

export default function* rootSaga(): Generator<unknown> {
  return yield all([cart]);
}
