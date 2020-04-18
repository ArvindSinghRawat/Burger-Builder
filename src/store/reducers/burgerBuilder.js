import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const basePrice = 4.0;

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initalState = {
  ingredients: null,
  totalPrice: basePrice,
  error: false,
};

const reducer = (state = initalState, action) => {
  if (action) {
    switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
        return updateObject(state, {
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
              state.ingredients[action.ingredientName] + 1,
          },
          totalPrice:
            state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        });
      case actionTypes.REMOVE_INGREDIENT:
        return updateObject(state, {
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
              state.ingredients[action.ingredientName] - 1,
          },
          totalPrice:
            state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        });
      case actionTypes.SET_INGREDIENTS:
        return updateObject(state, {
          ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
          },
          totalPrice: basePrice,
        });
      case actionTypes.FETCH_INGREDIENTS_FAILED:
        return updateObject(state, { error: true });
      default:
        break;
    }
  }
  return state;
};

export default reducer;
