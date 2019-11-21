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

    let isInCart = false;
    console.log("this is the props cart", this.props.cart);
    this.props.cart.forEach(i => {
      if (i.itemId === this.props.item) {
        isInCart = true;
        return;
      }
    });
    console.log("state of incarts", isInCart);

    data.append("productId", this.props.item);
    data.append("userId", this.props.user._id);
    data.append("update", isInCart);
    let quantity = 1;

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
      console.log("this is the cart ", this.props.cart);
      // console.log(
      //   "dispatching add cart",
      //   this.props.cart.concat(parsedBody.item)
      // );

      this.props.cart.forEach(i => {
        if (i.itemId === parsedBody.item.itemId) {
          console.log("matching", i.itemId, "and ", parsedBody.item.itemId);
          i.quantity = i.quantity + quantity;
        }
      });

      this.props.dispatch({
        type: "add-cart",
        cart: this.props.cart.splice(
          0,
          this.props.cart.length,
          ...this.props.cart
        )
      });
    }
  };

  handleQuantity = e => {
    e.preventDefault();
    // this.state.quantity
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
