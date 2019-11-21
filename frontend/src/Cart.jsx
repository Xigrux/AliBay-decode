import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard.jsx";

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
        return i.itemId;
      });
    } else if (this.props.user) {
      cart = this.props.user.cart;
      cart = cart.map(i => {
        return i.itemId;
      });
    }
    this.setState({ cart });
    this.setState({ displayItems: await this.getCartItems(cart) });
    console.log(this.state.displayItems);
  };

  getCartItems = async cart => {
    cart = cart.join(",");
    console.log("cart before fetch", cart);
    let data = new FormData();
    data.append("cart", cart);
    let response = await fetch("/cart", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsedBody = JSON.parse(responseBody);
    console.log("cart after fetch", parsedBody);
    return parsedBody.items;
  };

  removeDupes = arr => {
    let seen = {};
    let ret = [];
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i].productName; // item = array's individual obj's product name
      if (!seen[item]) {
        // if the array's obj's name prop isn't in seen obj, or has value of false...
        seen[item] = true; // the item is now considered seen
        ret.push(arr[i]); // push entire object to new array
      }
    }
    return ret;
  };
  render = () => {
    // let items = this.props.itemIds.map((itemId, index) => {
    //   let quantityToBuy = 0;

    //   cart.forEach(item => {
    //     if (item.productName === cart[index].productName) {
    //       quantityToBuy++;
    //     }
    //   });
    //   return (
    //     <div>
    //       <div>{cart[index].productName}</div>
    //       <div>Quantity: {quantityToBuy}</div>
    //       <div>
    //         <Link to={"/product/" + itemId}>View item</Link>
    //       </div>
    //       <div>{cart[index].descriptionBody}</div>
    //     </div>
    //   );
    // });

    // return (
    //   <div>
    //     {items}
    //     <div>
    //       cart <Link to="/checkout">checkout</Link>
    //     </div>
    //   </div>
    // ); // TODO: filter items to prevent duplicates from being displayed
    if (this.state.displayItems && this.props.isLoggedIn) {
      console.log(this.state.displayItems);
      return this.state.displayItems.map(o => {
        return <ProductCard itemContents={o}></ProductCard>;
      });
    }

    return <>your cart is empty</>;
  };
}

let mapStateToProps = state => {
  return { user: state.user, cart: state.cart, isLoggedIn: state.loggedIn };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);

export default Cart;
