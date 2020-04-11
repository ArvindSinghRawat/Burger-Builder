import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

export class Checkout extends Component {
  state = {
    salad: 1,
    meat: 1,
    bacon: 1,
    cheese: 1,
  };

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state} />
      </div>
    );
  }
}

export default Checkout;
