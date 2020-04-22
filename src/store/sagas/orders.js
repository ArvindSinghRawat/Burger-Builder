import { put } from "redux-saga/effects";
import axios from "../../axios-orders";

import {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailed,
} from "../actions/orders";

export function* fetchOrdersSaga(action) {
  yield put(fetchOrdersStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  const targetUrl = "/orders.json" + (action.token ? queryParams : "");
  try {
    const response = yield axios.get(targetUrl);
    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({ ...response.data[key], id: key });
    }
    yield put(fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(fetchOrdersFailed(error));
  }
}
