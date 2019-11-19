import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
    let items = this.props.itemIds.map(itemId, index => {
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
            <Link to={"/product/" + itemId} />
          </div>
          <div>{cart[index].descriptionBody}</div>
        </div>
      );
    });
    return { items };
  };
}

let mapStateToProps = state => {
  itemIds: state.cart;
};

let Cart = connect(mapStateToProps)(UnconnectedCart);

export default Cart;
