import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedAddToCart extends Component {
  handleAddToCart = event => {
    event.preventDefault();
    //does not do anything yet...
    //will make a call to the 'add-to-cart' endpoint
  };
  render() {
    return (
      <button onClick={this.handleAddToCart}>
        <i>Add to cart!</i>
      </button>
    );
  }
}

let mapStateToProps = st => {
  return { cart: st.cart };
};

let AddToCart = connect(mapStateToProps)(UnconnectedAddToCart);

export default AddToCart;
