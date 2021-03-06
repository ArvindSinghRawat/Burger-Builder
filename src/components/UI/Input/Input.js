import React from "react";

import styles from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [styles.InputElement];
  if (props.invalid && props.shouldValidate && props.interacted) {
    inputClasses.push(styles.Invalid);
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.elementValue}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.elementValue}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          {...props.elementConfig}
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
          className={inputClasses.join(" ")}
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
