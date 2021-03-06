import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Checkout from "./Checkout.jsx";
import ProductCard from "./ProductCard.jsx";
import RemoveItem from "./RemoveItem.jsx";
import "./style/cart.css";
class UnconnectedCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      displayItems: []
    };
  }

  componentDidMount = async () => {
    let cart = [];
    if (this.props.cart) {
      cart = this.props.cart;
      cart = cart.map(i => {
        if (i.quantity > 0) {
          return i.itemId;
        }
      });
    } else if (this.props.user) {
      cart = this.props.user.cart;
      cart = cart.map(i => {
        if (i.quantity > 0) {
          return i.itemId;
        }
      });
    }
    this.setState({ cart });
    if (cart.length > 0) {
      this.setState({ displayItems: await this.getCartItems(cart) });
    }
  };

  getCartItems = async cart => {
    cart = cart.join(",");

    let data = new FormData();
    data.append("cart", cart);

    let response = await fetch("/cart", {
      method: "POST",
      body: data
    });

    let responseBody = await response.text();
    let parsedBody = JSON.parse(responseBody);

    return parsedBody.items;
  };

  render = () => {
    if (
      this.state.displayItems &&
      this.props.isLoggedIn &&
      this.props.cart.length > 0
    ) {
      console.log(this.state.displayItems);

      let cartItem;
      let total = 0;
      return (
        <section>
          <div>YOUR CART</div>
          {this.state.displayItems.map(o => {
            this.props.cart.forEach(item => {
              if (o._id === item.itemId) {
                cartItem = item;
                console.log(typeof o.price, typeof item.quantity);
                total += o.price * item.quantity;
              }
            });
            return (
              <div class="cart-item-container">
                <div class="cart-item">
                  <ProductCard itemContents={o}></ProductCard>
                  <RemoveItem itemContents={cartItem} />
                </div>

                <div class="cart-item-quantity">{cartItem.quantity}</div>
              </div>
            );
          })}
          <div>
            total: <sup>$</sup>
            {Math.round(total * 100) / 100}
            <small>CAD</small>
          </div>
          <Checkout user={this.props.user} cart={this.props.cart} />
        </section>
      );
    }
    return <>your cart is empty</>;
  };
}

let mapStateToProps = state => {
  return { user: state.user, cart: state.cart, isLoggedIn: state.loggedIn };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);

export default Cart;
