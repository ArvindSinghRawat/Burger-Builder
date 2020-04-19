import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          sidedrawerToggleClicked={this.sidedrawerToggleHandler}
        />
        <Sidedrawer
          isAuthenticated={this.props.isAuthenticated}
          close={this.sidedrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token ? true : false,
});

export default connect(mapStateToProps)(Layout);
