import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";

import { checkAuthState } from "./store/actions/index";
import { connect } from "react-redux";

import Spinner from "./components/UI/Spinner/Spinner";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));

const Orders = React.lazy(() => import("./containers/Orders/Orders"));

const Auth = React.lazy(() => import("./containers/Auth/Auth"));

const App = (props) => {
   useEffect(() => {
      props.onTryAutoSignUp();
   }, []);

   let routes = (
      <Switch>
         <Route path="/auth" render={(props) => <Auth {...props} />} />
         <Route exact path="/" component={BurgerBuilder} />
         <Redirect to="/" />
      </Switch>
   );
   if (props.isAuthenticated) {
      routes = (
         <Switch>
            <Route path="/auth" render={(props) => <Auth {...props} />} />
            <Route path="/orders" render={(props) => <Orders {...props} />} />
            <Route
               path="/checkout"
               render={(props) => <Checkout {...props} />}
            />
            <Route path="/logout" component={Logout} />
            <Route exact path="/" component={BurgerBuilder} />
            <Redirect to="/" />
         </Switch>
      );
   }
   return (
      <div>
         <Layout>
            <Suspense fallback={<Spinner />}>{routes}</Suspense>
         </Layout>
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
