import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// let globalCart = [
//   { productName: "shoe", descriptionBody: "test1234444545645" },
//   { productName: "shoe", descriptionBody: "test1234444545645" },
//   { productName: "mat", descriptionBody: "test1234444545645" },
//   { productName: "hat", descriptionBody: "test1234444545645" },
//   { productName: "gnat", descriptionBody: "test1234444545645" }
// ];

class UnconnectedCart extends Component {
  getCartItems = async () => {
    let data = new FormData();
    data.append("cart", this.props.itemIds);
    let response = await fetch("/cart", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsedBody = JSON.parse(responseBody);
    return parsedBody;
  };
  render = () => {
    let cart = this.getCartItems();
    let items = this.props.itemIds.map((itemId, index) => {
      let quantityToBuy = 0;

      cart.forEach(item => {
        if (item.productName === cart[index].productName) {
          quantityToBuy++;
        }
      });
      return (
        <div>
          <div>{cart[index].productName}</div>
          <div>Quantity: {quantityToBuy}</div>
          <div>
            <Link to={"/product/" + itemId}>View item</Link>
          </div>
          <div>{cart[index].descriptionBody}</div>
        </div>
      );
    });
    return items; // TODO: filter items to prevent duplicates from being displayed
  };
}

let mapStateToProps = state => {
  return { itemIds: state.cart };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);

export default Cart;
