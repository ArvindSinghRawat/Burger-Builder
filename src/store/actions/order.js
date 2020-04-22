import * as actionTypes from "./actionTypes";

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

export const purchaseBurger = (orderData, token) => ({
  type: actionTypes.PURCHASE_BURGER,
  orderData: orderData,
  token: token,
});

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});
