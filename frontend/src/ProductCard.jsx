import React, { Component } from "react";
import AddToCart from "./AddToCart.jsx";
import { Link } from "react-router-dom";
import "./style/productcard.css";
import { FiStar } from "react-icons/fi";

class ProductCard extends Component {
  render = () => {
    console.log("============itemcontents========", this.props.itemContents);
    //adds the values of each of the ratings to the 'roundedRating' variable
    let allRatings = Object.values(this.props.itemContents.ratings);
    let roundedRating = 0;
    if (allRatings.length > 0) {
      allRatings.forEach(rating => {
        roundedRating += rating;
      });
      //devides the total of all of the ratings by the number of ratings to get the average value
      roundedRating = Math.round(roundedRating / allRatings.length);
    }

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
          <img
            class="productcard-img"
            src={this.props.itemContents.posts[0]}
          ></img>
          {/* <img class="productcard-img" src="/img/hero.jpg"></img> */}
          <div class="productcard-body">
            <div class="productcard-product">
              {/* Title:*/}
              {this.props.itemContents.productName}{" "}
              <div class="productcard-desc">
                {/* smol desc:*/}
                {this.props.itemContents.descriptionHeader}
              </div>
              <div class="productcard-desc">
                {/* Placeholder ratings information ---- Feel free to use these numbers however you like  */}
                Rating: {roundedRating} - number of reviews:{allRatings.length}
              </div>
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
