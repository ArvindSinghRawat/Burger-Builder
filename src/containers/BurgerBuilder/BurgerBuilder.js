import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "../../axios-orders";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import {
   addIngredient,
   removeIngredient,
   initIngredients,
   purchaseInit,
   setAuthRedirect,
} from "../../store/actions/index";

export const BurgerBuilder = (props) => {
   const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
   const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
   const error = useSelector((state) => state.burgerBuilder.error);
   const isAuthenticated = useSelector((state) =>
      state.auth.token ? true : false
   );

   const dispatch = useDispatch();

   const onIngredientAdded = (ingredientName) =>
      dispatch(addIngredient(ingredientName));
   const onIngredientRemove = (ingredientName) =>
      dispatch(removeIngredient(ingredientName));
   const onIngredientsFetched = useCallback(() => dispatch(initIngredients()), [
      dispatch,
   ]);
   const onInitPurchase = () => dispatch(purchaseInit());
   const onSetAuthRedirectPath = (path) => dispatch(setAuthRedirect(path));
   const [purchasing, setPurchasing] = useState(false);

   useEffect(() => {
      onIngredientsFetched();
   }, [onIngredientsFetched]);

   const updatePurchaseState = (updatedIngredients) => {
      const ingredients = {
         ...updatedIngredients,
      };
      const sum = Object.keys(ingredients)
         .map((ingredientsKey) => ingredients[ingredientsKey])
         .reduce((sum, el) => sum + el, 0);
      return sum > 0;
   };

   const purchaseHandler = () => {
      if (isAuthenticated) {
         setPurchasing(true);
      } else {
         onSetAuthRedirectPath("/checkout");
         props.history.push("/auth");
      }
   };

   const cancelPurchaseHandler = () => {
      setPurchasing(false);
   };

   const continuePurchaseHandler = () => {
      onInitPurchase();
      props.history.push("/checkout");
   };

   const disabledInfo = {
      ...ingredients,
   };

   for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
   }

   let orderSummary = null;
   let burger = error ? (
      <h3
         style={{
            width: "100%",
            textAlign: "center",
            margin: "16px auto",
         }}
      >
         {" "}
         Ingredients can't be loaded{" "}
      </h3>
   ) : (
      <div
         style={{
            display: "flex",
            flexFlow: "column",
            height: "100vh",
            width: "100vw",
            alignContent: "center",
            justifyContent: "center",
            position: "absolute",
            top: "0",
            left: "0",
         }}
      >
         <Spinner />
      </div>
   );

   if (ingredients) {
      burger = (
         <Aux>
            <Burger ingredients={ingredients} />
            <BuildControls
               ingredientAdded={onIngredientAdded}
               ingredientRemoved={onIngredientRemove}
               disabled={disabledInfo}
               price={totalPrice}
               purchasable={updatePurchaseState(ingredients)}
               ordered={purchaseHandler}
               isAuthenticated={isAuthenticated}
            />
         </Aux>
      );
      orderSummary = (
         <OrderSummary
            ingredients={ingredients}
            price={totalPrice}
            purchaseCancelled={cancelPurchaseHandler}
            purchseContinued={continuePurchaseHandler}
         />
      );
   }

   return (
      <Aux>
         <Modal show={purchasing} modalClosed={cancelPurchaseHandler}>
            {orderSummary}
         </Modal>
         {burger}
      </Aux>
   );
};

export default withErrorHandler(BurgerBuilder, axios);
