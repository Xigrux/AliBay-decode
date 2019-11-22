import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart.jsx";

class unconnectedProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDetails: [],
      userRating: undefined
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
  handleRatingChange = event => {
    this.setState({ userRating: event.target.value });
  };
  handleRatingSubmit = async event => {
    event.preventDefault();
    let rating = this.state.userRating;
    let itemId = this.props.id;
    let username = this.props.user.username;
    console.log(
      "RATING:",
      rating,
      " - ITEM ID:",
      itemId,
      " - USERNAME:",
      username
    );
    let data = new FormData();
    data.append("rating", rating);
    data.append("id", itemId);
    data.append("username", username);
    let response = await fetch("/rating", { method: "POST", body: data });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("Rating success:", body.succes);
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
        <div>
          Seller:{" "}
          <Link to={"/seller/" + this.state.itemDetails.sellerId}>
            {this.state.itemDetails.sellerId}
          </Link>
        </div>
        {/* Rating inputs! */}
        <form onSubmit={this.handleRatingSubmit}>
          Rate this product
          <input
            type="radio"
            name="stars"
            value={1}
            onChange={this.handleRatingChange}
            required
          ></input>
          <input
            type="radio"
            name="stars"
            value={2}
            onChange={this.handleRatingChange}
          ></input>
          <input
            type="radio"
            name="stars"
            value={3}
            onChange={this.handleRatingChange}
          ></input>
          <input
            type="radio"
            name="stars"
            value={4}
            onChange={this.handleRatingChange}
          ></input>
          <input
            type="radio"
            name="stars"
            value={5}
            onChange={this.handleRatingChange}
          ></input>
          <button>Submit rating!</button>
        </form>

        <AddToCart
          item={this.props.id}
          inventory={this.state.itemDetails.inventory}
        ></AddToCart>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return { user: st.user };
};

let ProductPage = connect(mapStateToProps)(unconnectedProductPage);

export default ProductPage;
