import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class unconnectedCheckout extends Component {
  render = () => {
    return <>checkout</>;
  };
}

let Checkout = connect()(unconnectedCheckout);

export default Checkout;
