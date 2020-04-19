import * as actionTypes from "./actionTypes";
import axios, { API_KEY } from "../../axios-auth";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const auth = (email, password) => (dispatch) => {
  console.log("asdfas");
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  axios
    .post("/accounts:signUp?key=" + API_KEY, authData)
    .then((response) => {
      console.log(response.data);
      dispatch(authSuccess(response.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(authFailed(error));
    });
};
