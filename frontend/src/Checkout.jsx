import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom"

class UnconnectedCheckout extends Component {
  constructor() {
    super() 
    this.state = {
      checkedOut: false,
      item: {}
    }
  }
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
      console.log(parsed.purchaseOrder)
      this.props.dispatch({type: "new-po", purchased: parsed.purchased, purchaseOrder: parsed.purchaseOrder})
      this.props.history.push("/confirmation")
    }
    
    this.setState({checkedOut: true, item: parsed.purchased})
  };
  render = () => {
    return (
      <>
        <button type="submit" onClick={this.handleCheckout}>
          Checkout!
        </button>
      </>
    );
  };
}

let Checkout = connect()(withRouter(UnconnectedCheckout));

export default Checkout;
