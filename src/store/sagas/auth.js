import { put } from "redux-saga/effects";
import { delay } from "redux-saga/effects";
import {
  logoutSucceed,
  logout,
  authStart,
  authSuccess,
  authFailed,
  checkAuthTimeout,
} from "../actions/auth";
import axios, { API_KEY } from "../../axios-auth";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expiresAt");
  yield localStorage.removeItem("userId");
  yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(logout());
}

export function* authSaga(action) {
  yield put(authStart());
  const targetUrl =
    (action.isSignUp
      ? "/accounts:signUp?key="
      : "/accounts:signInWithPassword?key=") + API_KEY;
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  try {
    // Sending Request
    const response = yield axios.post(targetUrl, authData);
    // Processing Request
    const expiresAt = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expiresAt", expiresAt);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(authSuccess(response.data.idToken, response.data.localId));
    yield put(checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    put(authFailed(error.response.data.error));
  }
}

export function* checkAuthStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(logout());
  } else {
    const expirationTime = yield new Date(localStorage.getItem("expiresAt"));
    if (expirationTime < new Date()) {
      yield put(logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(authSuccess(token, userId));
      yield put(
        checkAuthTimeout(
          (expirationTime.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
