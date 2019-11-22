import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Checkout extends Component {
  handleCheckout = async e => {
    e.preventDefault();
    let data = new FormData();
    console.log(this.props.user._id);
    data.append("id", this.props.user._id);
    console.log(this.props.cart);
    data.append("cart", JSON.stringify(this.props.cart));
    let response = await fetch("/confirm-payment", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
  };
  render = () => {
    return (
      <Link to="/confirmation">
        <div>
          <button type="submit" onClick={this.handleCheckout}>
            Checkout!
          </button>
        </div>
      </Link>
    );
  };
}

export default Checkout;
