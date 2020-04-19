import * as actionTypes from "./actionTypes";
import axios, { API_KEY } from "../../axios-auth";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const auth = (email, password, isSignUp) => (dispatch) => {
  dispatch(authStart());
  const targetUrl =
    (isSignUp ? "/accounts:signUp?key=" : "/accounts:signInWithPassword?key=") +
    API_KEY;
  console.log(isSignUp, targetUrl);
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  axios
    .post(targetUrl, authData)
    .then((response) => {
      console.log(response.data);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((error) => {
      console.log(error);
      dispatch(authFailed(error.response.data.error));
    });
};
