import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Checkout extends Component {
  handleCheckout = async () => {
    let data = new FormData();
    data.append("id", this.props.user.id);
    data.append("cart", this.state.cart);
    let response = await fetch("/confirm-payement", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);

    if (parsed.success) {
      this.setState({ cart: parsed.cart });
    }
  };
  render = () => {
    return (
      <div>
        <button type="submit" onClick={this.handleCheckout}>
          Checkout!
        </button>
      </div>
    );
  };
}

export default Checkout;
