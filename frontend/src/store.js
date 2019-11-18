// PLEASE IMPORT ALL AT THE TOP
import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "logout-success") {
    return { ...state, loggedIn: false };
  }
  return state;
};

// PLEASE POPULATE THE INITIAL STORE STATE SEPERATLY
let initialState = {
  test: "Store connected",
  loggedIn: true
};

let store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
