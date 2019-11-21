import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedAddToCart extends Component {
  handleAddToCart = async event => {
    event.preventDefault();
    console.log(this.props.user);
    //does not do anything yet...
    //will make a call to the 'add-to-cart' endpoint
    let data = new FormData();
    data.append("productId", this.props.item);
    data.append("userId", this.props.user);
    data.append("cart", this.props.user.cart);

    let response = await fetch("/add-to-cart", {
      // fix fetch request path
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    console.log("response body: ", responseBody);
    let parsedBody = JSON.parse(responseBody);
    console.log("parsed body: ", parsedBody);
    if (!parsedBody.success) {
      window.alert("Product submission failed");
      return;
    }
  };
  render() {
    return (
      <>
        {!this.props.isLoggedIn && (
          <>
            <button>
              <Link to="/dashboard">
                <i>Add to cart!</i>
              </Link>
            </button>
          </>
        )}

        {this.props.isLoggedIn && (
          <button onClick={this.handleAddToCart}>
            <Link to="/cart">
              <i>Add to cart!</i>
            </Link>
          </button>
        )}
      </>
    );
  }
}

let mapStateToProps = st => {
  return {
    isLoggedIn: st.loggedIn,
    user: st.user
  };
};

let AddToCart = connect(mapStateToProps)(UnconnectedAddToCart);

export default AddToCart;
