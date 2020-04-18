// For Fetching and Listing orders

import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders: orders,
});

export const fetchOrdersFailed = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  error: error,
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = () => (dispatch) => {
  fetchOrdersStart();
  axios
    .get("/orders.json")
    .then((response) => {
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({ ...response.data[key], id: key });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch((error) => {
      dispatch(fetchOrdersFailed(error));
    });
};
