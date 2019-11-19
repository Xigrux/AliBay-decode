import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedCart extends Component {
  render = () => {};
}

let Cart = connect()(UnconnectedCart);

export default Cart;
