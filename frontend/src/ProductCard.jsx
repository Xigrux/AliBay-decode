import React, { Component } from "react";
import AddToCart from "./AddToCart.jsx";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  render = () => {
    return (
      //Each item card will link to that item page.
      //The data displayed on the card will be passed down from the parent component as props
      //The parent component will map through the array of items received from the db and display a product card for each
      <Link to={"/product/" + this.props.itemContents._id}>
        <div>Title:{this.props.itemContents.productName}</div>
        <div>smol desc:{this.props.itemContents.descriptionHeader}</div>
        {/* will need to map through the posts array and create an img element foreach */}
        <img
          src={this.props.itemContents.posts[0]}
          style={{ height: "40px" }}
        ></img>
        <div>price:{this.props.itemContents.price}</div>
        {/* will need to get the average from all of the ratings in the ratings object */}
        <div>rating:{this.props.itemContents.ratings[0]}</div>

        <AddToCart item={this.props.itemContents._id} />
      </Link>
    );
  };
}

export default ProductCard;
