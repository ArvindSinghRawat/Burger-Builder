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

  sidedrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar sidedrawerToggleClicked={this.sidedrawerToggleHandler} />
        <Sidedrawer
          close={this.sidedrawerClosedHandler}
          open={this.state.showSideDrawer}
          sideD
        />
        <div>Sidedrawer, Backdrop</div>
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
