import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import styles from "./Layout.module.css";

const Layout = (props) => {
   const [showSideDrawer, setShowSideDrawer] = useState(false);

   const sidedrawerClosedHandler = () => {
      setShowSideDrawer(false);
   };

   const sidedrawerToggleHandler = () => {
      setShowSideDrawer(!showSideDrawer);
   };

   return (
      <Aux>
         <Toolbar
            isAuthenticated={props.isAuthenticated}
            sidedrawerToggleClicked={sidedrawerToggleHandler}
         />
         <Sidedrawer
            isAuthenticated={props.isAuthenticated}
            close={sidedrawerClosedHandler}
            open={showSideDrawer}
         />
         <main className={styles.Content}>{props.children}</main>
      </Aux>
   );
};

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.token ? true : false,
});

export default connect(mapStateToProps)(Layout);
