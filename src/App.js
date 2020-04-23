import React, { useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";

import { checkAuthState } from "./store/actions/index";
import { connect } from "react-redux";
import asyncComponent from "./hoc/async/async";

const asyncCheckout = asyncComponent(() =>
   import("./containers/Checkout/Checkout")
);

const asyncOrders = asyncComponent(() => import("./containers/Orders/Orders"));

const asyncAuth = asyncComponent(() => import("./containers/Auth/Auth"));

const App = (props) => {
   useEffect(() => {
      props.onTryAutoSignUp();
   }, []);

   let routes = (
      <Switch>
         <Route path="/auth" component={asyncAuth} />
         <Route exact path="/" component={BurgerBuilder} />
         <Redirect to="/" />
      </Switch>
   );
   if (props.isAuthenticated) {
      routes = (
         <Switch>
            <Route path="/auth" component={asyncAuth} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/logout" component={Logout} />
            <Route exact path="/" component={BurgerBuilder} />
            <Redirect to="/" />
         </Switch>
      );
   }
   return (
      <div>
         <Layout>{routes}</Layout>
      </div>
   );
};

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.token ? true : false,
});

const mapDispatchToProps = (dispatch) => ({
   onTryAutoSignUp: () => dispatch(checkAuthState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
