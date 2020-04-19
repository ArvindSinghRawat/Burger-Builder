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
  orders: [],
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = (token, userId) => (dispatch) => {
  fetchOrdersStart();
  const queryParams =
    "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
  const targetUrl = "/orders.json" + (token ? queryParams : "");
  //console.log("Target Url : ", targetUrl, token);
  axios
    .get(targetUrl)
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
