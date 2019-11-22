import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./style/addtocart.css";

class UnconnectedAddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantitySelected: 1
    };
  }
  handleAddToCart = async event => {
    event.preventDefault();
    let isInCart = false;
    this.props.cart.forEach(i => {
      if (i.itemId === this.props.item) {
        isInCart = true;
        return;
      }
    });
    console.log("state of incarts", isInCart);

    let data = new FormData();
    data.append("productId", this.props.item);
    data.append("userId", this.props.user._id);
    data.append("update", isInCart);
    data.append("quantity", this.state.quantitySelected);

    let response = await fetch("/add-to-cart", {
      // fix fetch request path
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsedBody = JSON.parse(responseBody);

    if (!parsedBody.success) {
      window.alert("Product submission failed");
    } else {
      let isMatching = false;
      this.props.cart.forEach(i => {
        if (i.itemId === parsedBody.item.itemId) {
          console.log("matching", i.itemId, "and ", parsedBody.item.itemId);
          console.log(typeof this.state.quantitySelected);
          i.quantity = i.quantity + parseInt(this.state.quantitySelected);
          isMatching = true;
          return;
        }
      });
      if (!isMatching) {
        console.log("did not match so pushing");
        this.props.cart.push(parsedBody.item);
      }

      console.log("this is the Response item", parsedBody.item);

      console.log("this is the new cart obj", this.props.cart);

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
    console.log(e.target.value);
    this.setState({ quantitySelected: e.target.value });
  };
  render() {
    return (
      <>
        {!this.props.isLoggedIn && (
          <>
            <button>
              <Link to="/dashboard">
                <i>ADD</i>
              </Link>
            </button>
          </>
        )}

        {this.props.isLoggedIn && this.props.user.userType === "users" && (
          <div class="addtocart-container">
            <button onClick={this.handleAddToCart}>
              <Link>
                {/* <Link to="/cart"> */}
                ADD
              </Link>
            </button>
            <input
              type="number"
              placeholder="1"
              min="0"
              max={this.props.inventory}
              onChange={this.handleQuantity}
              class="addtocart-input"
            />
          </div>
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
