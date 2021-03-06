// PLEASE IMPORT ALL AT THE TOP
import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, loggedIn: true, user: action.user, cart: action.cart };
  }
  if (action.type === "logout-success") {
    return {
      loggedIn: false,
      user: undefined,
      cart: undefined
    };
  }
  if (action.type === "search-query") {
    return { ...state, searchResult: action.searchResult };
  }

  if (action.type === "add-cart") {
    return { ...state, cart: action.cart };
  }

  if (action.type === "clear-cart") {
    return { ...state, cart: [] };
  }

  if (action.type === "new-po") {
    let user = state.user;
    user.purchased = action.purchased;
    let purchaseOrder = action.purchaseOrder;
    return { ...state, user, purchaseOrder };
  }

  return state;
};

// PLEASE POPULATE THE INITIAL STORE STATE SEPERATLY
let initialState = {
  loggedIn: false,
  user: undefined, // user object containing all user info
  cart: undefined,
  searchResult: [],
  purchaseOrder: undefined
};

let store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
