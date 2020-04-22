import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authSaga,
  checkAuthStateSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerSaga } from "./order";
import { fetchOrdersSaga } from "./orders";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, checkAuthStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
}

export function* watchOrders() {
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
