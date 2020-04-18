import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { addIngredient, removeIngredient } from "../../store/actions/burgerBuilder";

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasing: false,
    loading: false,
  };

  // componentDidMount() {
  //   axios.get("/ingredients.json").then((response) => {
  //     this.setState({
  //       ingredients: response.data,
  //     });
  //   });
  // }

  updatePurchaseState = (updatedIngredients) => {
    const ingredients = {
      ...updatedIngredients,
    };
    const sum = Object.keys(ingredients)
      .map((ingredientsKey) => ingredients[ingredientsKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  cancelPurchaseHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  continuePurchaseHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
    }

    let orderSummary = null;
    let burger = (
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

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          purchaseCancelled={this.cancelPurchaseHandler}
          purchseContinued={this.continuePurchaseHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchaseHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
});

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingredientName) =>
    dispatch(addIngredient(ingredientName)),
  onIngredientRemove: (ingredientName) =>
    dispatch(removeIngredient(ingredientName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
