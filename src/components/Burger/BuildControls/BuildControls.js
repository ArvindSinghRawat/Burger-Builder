import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price : <b>${props.price.toFixed(2)}</b>
      </p>
      {controls.map((control) => (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => {
            props.ingredientAdded(control.type);
          }}
          removed={() => {
            props.ingredientRemoved(control.type);
          }}
          disabled={props.disabled[control.type]}
        />
      ))}
      <button
        className={styles.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuthenticated ? "Order Now" : "SignIn to Continue"}
      </button>
    </div>
  );
};

export default buildControls;
