import * as actionTypes from "../actions/actionTypes";

const intitalState = {
  orders: [],
  loading: false,
};

export const orderReducer = (state = intitalState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.concat({
          ...action.orderData,
          id: action.orderId,
        }),
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      break;
    default:
      break;
  }
  return state;
};
