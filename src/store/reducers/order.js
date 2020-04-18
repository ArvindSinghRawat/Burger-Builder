import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const intitalState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseBurgerStart = (state, action) =>
  updateObject(state, { loading: true });

const purchaseBurgerSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    orders: state.orders.concat({
      ...action.orderData,
      id: action.orderId,
    }),
    purchased: true,
  });

const purchaseBurgerFailed = (state, action) =>
  updateObject(state, { loading: false });

const purchaseBurgerInit = (state, action) =>
  updateObject(state, { purchased: false });

const fetchOrderSuccess = (state, action) =>
  updateObject(state, {
    orders: action.orders,
    loading: false,
  });

const fetchOrderFailed = (state, action) =>
  updateObject(state, {
    orders: action.orders,
    loading: false,
  });

const fetchOrderStart = (state, action) =>
  updateObject(state, { loading: true });

const reducer = (state = intitalState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state, action);
    case actionTypes.PURCHASE_INIT:
      return purchaseBurgerInit(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrderStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrderFailed(state, action);
    default:
      break;
  }
  return state;
};

export default reducer;
