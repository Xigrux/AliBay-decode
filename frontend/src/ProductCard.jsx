import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  render = () => {
    return (
      //Each item card will link to that item page.
      //The data displayed on the card will be passed down from the parent component as props
      //The parent component will map through the array of items received from the db and display a product card for each
      <Link to={"/product/" + this.props.id}>
        <img src="placeholderImgData"></img>
        <div>Title:{this.props.title}</div>
        <div>smol desc:{this.props.description}</div>
        <div>price:{this.props.price}</div>
        <div>rating:{this.props.rating}</div>
      </Link>
    );
  };
}

export default ProductCard;
