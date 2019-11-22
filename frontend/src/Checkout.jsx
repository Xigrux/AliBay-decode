import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedCheckout extends Component {
  handleCheckout = async e => {
    e.preventDefault();
    let data = new FormData();
    data.append("id", this.props.user._id);
    data.append("cart", JSON.stringify(this.props.cart));
    let response = await fetch("/confirm-payment", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      this.props.dispatch({ type: "clear-cart" });
    }
  };
  render = () => {
    return (
      <>
        <button type="submit" onClick={this.handleCheckout}>
          <Link to="/confirmation">Checkout!</Link>
        </button>
      </>
    );
  };
}

let Checkout = connect()(UnconnectedCheckout);

export default Checkout;
