import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initalState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const reducer = (state = initalState, action) => {
  if (action) {
    switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
              state.ingredients[action.ingredientName] + 1,
          },
          totalPrice:
            state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        };
      case actionTypes.REMOVE_INGREDIENT:
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
              state.ingredients[action.ingredientName] - 1,
          },
          totalPrice:
            state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        };
      default:
        break;
    }
  }
  return state;
};

export default reducer;
