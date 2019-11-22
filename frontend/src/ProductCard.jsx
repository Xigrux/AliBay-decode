import React, { Component } from "react";
import AddToCart from "./AddToCart.jsx";
import { Link } from "react-router-dom";
import "./style/productcard.css";
import { FiStar } from "react-icons/fi";

class ProductCard extends Component {
  render = () => {
    return (
      <div>
        {/* //Each item card will link to that item page. //The data displayed on
        the card will be passed down from the parent component as props //The
        parent component will map through the array of items received from the
        db and display a product card for each */}
        <Link
          to={"/product/" + this.props.itemContents._id}
          class="productcard-container"
        >
          {/* <img src={this.props.itemContents.posts[0]}></img>  you should map later*/}
          <img class="productcard-img" src="/img/hero.jpg"></img>
          <div class="productcard-body">
            <div class="productcard-product">
              {/* Title:*/}
              {this.props.itemContents.productName}{" "}
              <span class="productcard-desc">
                {/* smol desc:*/}
                {this.props.itemContents.descriptionHeader}
              </span>
            </div>

            <div class="productcard-price">
              <sup>$</sup>
              {this.props.itemContents.price}
              <small>CAD</small>
            </div>
            {/* will need to get the average from all of the ratings in the ratings object */}
            {/* <div>rating:{this.props.itemContents.ratings[0]}</div> disabled for now */}
            <div class="productcard-rating">
              <FiStar />
              <FiStar />
              <FiStar />
              <FiStar />
              <FiStar />
            </div>
          </div>
        </Link>
        <AddToCart
          item={this.props.itemContents._id}
          inventory={this.props.itemContents.inventory}
        />
      </div>
    );
  };
}

export default ProductCard;
