import { put } from "redux-saga/effects";
import axios from "../../axios-orders";

import {
  purchaseBurgerStart,
  purchaseBurgerSuccess,
  purchaseBurgerFailed,
} from "../actions/order";

export function* purchaseBurgerSaga(action) {
  try {
    yield put(purchaseBurgerStart());
    const targetUrl =
      "/orders.json" + (action.token ? "?auth=" + action.token : "");
    const response = yield axios.post(targetUrl, action.orderData);
    yield put(purchaseBurgerSuccess(response.data, action.orderData));
  } catch (error) {
    yield put(purchaseBurgerFailed(error));
  }
}
