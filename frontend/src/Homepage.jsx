import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./style/homepage.css";
import FeaturedProd from "./FeaturedProd";
import { WiStars } from "react-icons/wi";

class UnconnecterHomepage extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div>
        <div class="homepage-hero flex-container flex-center-v flex-center-h">
          Sparkin' Joy
        </div>
        <div class="homepage-cat-container flex-container flex-center-v flex-evenly-h ">
          <Link
            to="/category/electronic"
            class="homepage-cat-card cat-electro flex-container flex-center-v flex-center-h"
          >
            <div class="homepage-cat-card-content">electro</div>
          </Link>
          <Link
            to="/category/food"
            class="homepage-cat-card cat-food flex-container flex-center-v flex-center-h"
          >
            <div class="homepage-cat-card-content">food</div>
          </Link>
          <Link
            to="/category/home"
            class="homepage-cat-card cat-home flex-container flex-center-v flex-center-h"
          >
            <div class="homepage-cat-card-content">home</div>
          </Link>
          <Link
            to="/category/office"
            class="homepage-cat-card cat-office flex-container flex-center-v flex-center-h"
          >
            <div class="homepage-cat-card-content">office</div>
          </Link>
        </div>
        <div>
          <div class="homepage-featured flex-container flex-center-v flex-center-h">
            Our sparks
            <WiStars />
          </div>
          {/* <div class="homepage-card-containter">
            <FeaturedProd />
          </div> */}
        </div>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return {};
};

let Homepage = connect(mapStateToProps)(UnconnecterHomepage);

export default Homepage;
