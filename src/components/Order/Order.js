import React from "react";

import styles from "./Order.module.css";

const order = () => {
  return (
    <div className={styles.Order}>
      <p>Ingredients :</p>
      <p>
        Price : <strong></strong>
      </p>
    </div>
  );
};

export default order;
