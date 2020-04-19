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

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

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
  //console.log(isSignUp, targetUrl);
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  axios
    .post(targetUrl, authData)
    .then((response) => {
      //console.log(response.data);
      const expiresAt = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("expiresAt", expiresAt);
      localStorage.setItem("userId", response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((error) => {
      //console.log(error);
      dispatch(authFailed(error.response.data.error));
    });
};

export const setAuthRedirect = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT,
  path: path,
});

export const checkAuthState = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(logout());
  } else {
    const expirationTime = new Date(localStorage.getItem("expiresAt"));
    if (expirationTime < new Date()) {
      dispatch(logout);
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
      dispatch(
        checkAuthTimeout(
          (expirationTime.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
};
