import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../../Navigation/SideDrawer/DrawerToggle/DrawerToggle";

import styles from "./Toolbar.module.css";
import { Link } from "react-router-dom";

const toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={props.sidedrawerToggleClicked} />
      <Link className={styles.Logo} to="/">
        <Logo />
      </Link>
      <nav className={styles.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </header>
  );
};

export default toolbar;
