// For Fetching and Listing orders

import * as actionTypes from "./actionTypes";

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders: orders,
});

export const fetchOrdersFailed = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  error: error,
  orders: [],
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = (token, userId) => ({
  type: actionTypes.FETCH_ORDERS,
  token: token,
  userId: userId,
});
