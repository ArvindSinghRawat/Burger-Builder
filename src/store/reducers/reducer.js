import * as actionTypes from "../actions";

const initalState = {
  ingredients: null,
  totalPrice: 4,
};

const reducer = (state = initalState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      break;
    case actionTypes.REMOVE_INGREDIENT:
      break;
    default:
      break;
  }
  return newState;
};

export default reducer;
