import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart.jsx";

class unconnectedProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDetails: []
    };
  }
  componentDidMount = () => {
    console.log("did mount, id:", this.props.id);
    this.getItemDetails();
  };
  getItemDetails = async () => {
    let data = new FormData();
    data.append("id", this.props.id);
    let response = await fetch("/product-page", { method: "POST", body: data });
    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ itemDetails: body.item });
    console.log("response body, item info:", body);
  };
  render = () => {
    console.log("itemDetails in the state:", this.state.itemDetails);
    console.log("item tags...", this.state.itemDetails.tags);
    let tags = [];
    if (this.state.itemDetails.tags !== undefined) {
      tags = this.state.itemDetails.tags.join(" ");
    }
    let images = [];
    if (this.state.itemDetails.posts !== undefined) {
      images = this.state.itemDetails.posts.map(imgPath => {
        return <img src={imgPath} />;
      });
    }
    return (
      <div>
        <h1>{this.state.itemDetails.productName}</h1>
        <h3>{this.state.itemDetails.descriptionHeader}</h3>
        <div>{images}</div>
        <div>{this.state.itemDetails.descriptionText}</div>
        <div>Location: {this.state.itemDetails.location}</div>
        <div>Price: {this.state.itemDetails.price}$</div>
        {/* Ratings to be added ==----== */}
        <div>Category: {this.state.itemDetails.category}</div>
        <div>Tags: {tags}</div>
        <div>Seller: {this.state.itemDetails.sellerId}</div>

        <AddToCart
          item={this.props.id}
          inventory={this.state.itemDetails.inventory}
        ></AddToCart>
      </div>
    );
  };
}

let ProductPage = connect()(unconnectedProductPage);

export default ProductPage;
