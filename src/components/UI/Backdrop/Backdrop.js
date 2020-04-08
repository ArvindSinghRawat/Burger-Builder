import React from "react";
import styles from "./Backdrop.module.css";
const backdrop = (props) => {
  // Fix for backdrop visibility in Large Screen
  const classes = [];
  classes.push(styles.Backdrop);
  if (props.classes) classes.push(...props.classes);
  return props.show ? (
    <div className={classes.join(" ")} onClick={props.clicked}></div>
  ) : null;
};

export default backdrop;
