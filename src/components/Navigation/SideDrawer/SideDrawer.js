import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import styles from "./SideDrawer.module.css";

const sideDrawer = (props) => {
  let attachedClasses = [styles.SideDrawer];
  if (props.open) {
    attachedClasses.push(styles.Open);
  } else {
    attachedClasses.push(styles.Close);
  }

  return (
    <Aux>
      <div className={attachedClasses.join(" ")}>
        <Backdrop show={props.open} clicked={props.close} />
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
