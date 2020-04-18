import * as actionTypes from "../actions/actionTypes";

const intitalState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = intitalState, action) => {
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
        purchased: true,
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      break;
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    default:
      break;
  }
  return state;
};

export default reducer;