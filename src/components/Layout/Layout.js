import React from "react";

import Aux from "../../hoc/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import styles from './Layout.module.css'

const layout = (props) => {
  return (
    <Aux>
      <Toolbar />
      <div>Sidedrawer, Backdrop</div>
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

export default layout;
