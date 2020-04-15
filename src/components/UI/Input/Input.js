import React from "react";

import styles from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={styles.InputElement}
          {...props.elementConfig}
          value={props.elementValue}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={styles.InputElement}
          {...props.elementConfig}
          value={props.elementValue}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={styles.InputElement}
          {...props.elementConfig}
          value={props.elementValue}
        />
      );
      break;
  }

  return (
    <div className={styles.Input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
