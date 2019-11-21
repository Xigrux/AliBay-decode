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
    data.append("userId", this.props.user._id);

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
    } else {
      console.log(
        "dispatching add cart",
        this.props.cart.concat(parsedBody.item)
      );
      this.props.dispatch({
        type: "add-cart",
        cart: this.props.cart.concat(parsedBody.item)
      });
    }
  };

  handleQuantity = e => {
    e.preventDefault();
    console.log(e.target.value);
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

        {this.props.isLoggedIn && this.props.user.userType === "users" && (
          <>
            <input
              type="number"
              placeholder="1"
              min="0"
              max={this.props.inventory}
              onChange={this.handleQuantity}
            />
            <button onClick={this.handleAddToCart}>
              <Link>
                {/* <Link to="/cart"> */}
                <i>Add to cart!</i>
              </Link>
            </button>
          </>
        )}
      </>
    );
  }
}

let mapStateToProps = st => {
  return {
    isLoggedIn: st.loggedIn,
    user: st.user,
    cart: st.cart
  };
};

let AddToCart = connect(mapStateToProps)(UnconnectedAddToCart);

export default AddToCart;
