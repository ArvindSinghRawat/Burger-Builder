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
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={styles.InputElement}
          {...props.elementConfig}
          value={props.elementValue}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={styles.InputElement}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.display}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={styles.InputElement}
          {...props.elementConfig}
          value={props.elementValue}
          onChange={props.changed}
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
