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
      <Backdrop
        classes={[styles.Backdrop]}
        show={props.open}
        clicked={props.close}
      />
      <div className={attachedClasses.join(" ")}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav onClick={props.close}>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
