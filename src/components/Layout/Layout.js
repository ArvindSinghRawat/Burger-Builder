import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/SideDrawer/SideDrawer";

import styles from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: true,
  };

  sidedrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar />
        <Sidedrawer
          close={this.sidedrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <div>Sidedrawer, Backdrop</div>
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
