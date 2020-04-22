import reducer, { initialState } from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("Auth Reducer", () => {
  it("Should return the intital state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it("Should store token upon Login", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        token: "test-token",
        userId: "test-userId",
      })
    ).toEqual({
      ...initialState,
      token: "test-token",
      userId: "test-userId",
    });
  });
});
