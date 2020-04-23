import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

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
   const [purchasing, setPurchasing] = useState(false);

   useEffect(() => {
      props.onIngredientsFetched();
   }, []);

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
      if (props.isAuthenticated) {
         setPurchasing(true);
      } else {
         props.onSetAuthRedirectPath("/checkout");
         props.history.push("/auth");
      }
   };

   const cancelPurchaseHandler = () => {
      setPurchasing(false);
   };

   const continuePurchaseHandler = () => {
      props.onInitPurchase();
      props.history.push("/checkout");
   };

   const disabledInfo = {
      ...props.ingredients,
   };

   for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
   }

   let orderSummary = null;
   let burger = props.error ? (
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

   if (props.ingredients) {
      burger = (
         <Aux>
            <Burger ingredients={props.ingredients} />
            <BuildControls
               ingredientAdded={props.onIngredientAdded}
               ingredientRemoved={props.onIngredientRemove}
               disabled={disabledInfo}
               price={props.totalPrice}
               purchasable={updatePurchaseState(props.ingredients)}
               ordered={purchaseHandler}
               isAuthenticated={props.isAuthenticated}
            />
         </Aux>
      );
      orderSummary = (
         <OrderSummary
            ingredients={props.ingredients}
            price={props.totalPrice}
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

const mapStateToProps = (state) => ({
   ingredients: state.burgerBuilder.ingredients,
   totalPrice: state.burgerBuilder.totalPrice,
   error: state.burgerBuilder.error,
   isAuthenticated: state.auth.token ? true : false,
});

const mapDispatchToProps = (dispatch) => ({
   onIngredientAdded: (ingredientName) =>
      dispatch(addIngredient(ingredientName)),
   onIngredientRemove: (ingredientName) =>
      dispatch(removeIngredient(ingredientName)),
   onIngredientsFetched: () => dispatch(initIngredients()),
   onInitPurchase: () => dispatch(purchaseInit()),
   onSetAuthRedirectPath: (path) => dispatch(setAuthRedirect(path)),
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
