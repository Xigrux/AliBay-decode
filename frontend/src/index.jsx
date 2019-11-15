// PLEASE IMPORT ALL AT THE TOP
import ReactDom from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "./store.js";
import App from "./App.jsx";

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
