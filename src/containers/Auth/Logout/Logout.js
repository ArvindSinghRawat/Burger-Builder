import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../../store/actions/index";

export const Logout = (props) => {
   useEffect(() => {
      props.onLogout();
   });
   return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => ({
   onLogout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
