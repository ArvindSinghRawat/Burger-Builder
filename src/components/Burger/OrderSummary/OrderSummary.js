import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";
const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    (ingredientKey) => (
      <li key={ingredientKey}>
        <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span> :{" "}
        <b>{props.ingredients[ingredientKey]}</b>
      </li>
    )
  );
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients : </p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout</p>
      <Button>CONTINUE</Button>
      <Button>CANCEL</Button>
    </Aux>
  );
};

export default orderSummary;
