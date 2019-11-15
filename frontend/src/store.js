// PLEASE IMPORT ALL AT THE TOP
import { createStore } from "redux";

let reducer = (state, action) => {
  return state;
};

// PLEASE POPULATE THE INITIAL STORE STATE SEPERATLY
let initialState = {
  test: "Store connected"
};

let store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
