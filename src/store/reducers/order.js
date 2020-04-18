import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const intitalState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = intitalState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return updateObject(state, {
        loading: false,
        orders: state.orders.concat({
          ...action.orderData,
          id: action.orderId,
        }),
        purchased: true,
      });
    case actionTypes.PURCHASE_BURGER_FAILED:
      return updateObject(state, { loading: false });
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        orders: action.orders,
        loading: false,
      });
    case actionTypes.FETCH_ORDERS_FAILED:
      return updateObject(state, { loading: false });
    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });
    default:
      break;
  }
  return state;
};

export default reducer;
