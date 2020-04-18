import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData: orderData,
});

export const purchaseBurgerFailed = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAILED,
  error: error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios
    .post("/orders.json", orderData)
    .then((response) => {
      console.log("[MIDDLEWARE] purchase response : ", response.data);
      dispatch(purchaseBurgerSuccess(response.data, orderData));
    })
    .catch((error) => {
      console.log(error);
      dispatch(purchaseBurgerFailed(error));
    });
};
