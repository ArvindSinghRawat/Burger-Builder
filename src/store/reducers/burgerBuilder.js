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

const addIngredient = (state, action) =>
  updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  });

const removeIngredient = (state, action) =>
  updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
  });

const setIngredient = (state, action) =>
  updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: basePrice,
  });

const fetchIngredient = (state, action) => updateObject(state, { error: true });

const reducer = (state = initalState, action) => {
  if (action) {
    switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
        return addIngredient(state, action);
      case actionTypes.REMOVE_INGREDIENT:
        return removeIngredient(state, action);
      case actionTypes.SET_INGREDIENTS:
        return setIngredient(state, action);
      case actionTypes.FETCH_INGREDIENTS_FAILED:
        return fetchIngredient(state, action);
      default:
        break;
    }
  }
  return state;
};

export default reducer;
