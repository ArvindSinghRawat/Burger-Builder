import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

export class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      bacon: 0,
      cheese: 0,
    },
  };

  componentWillMount() {
  const query = new URLSearchParams(this.props.location.search);
  const ingredients = {};
  let price = 0;
  for (let param of query.entries()) {
    if (param[0] === "price") {
      price = param[1];
      continue;
    }
    ingredients[param[0]] = +param[1];
  }
  this.setState({ ingredients: ingredients, totalPrice: price });
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log("[Checkout.js] Props : ", props, "\nState : ", state);
  //   const query = new URLSearchParams(props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       price = param[1];
  //       continue;
  //     }
  //     ingredients[param[0]] = +param[1];
  //   }
  //   return { ingredients: ingredients, totalPrice: price };
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    console.log("[Checkout.js] render state : ", this.state);
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
