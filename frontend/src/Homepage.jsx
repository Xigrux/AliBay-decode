import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./style/homepage.css";
import FeaturedProd from "./FeaturedProd";

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
        <div class="homepage-card-container flex-container flex-center-v flex-evenly-h ">
          <div class="homepage-cat-card cat-electro flex-container flex-center-v flex-center-h">
            <Link to="/category/electronic">electro</Link>
          </div>
          <div class="homepage-cat-card cat-food flex-container flex-center-v flex-center-h">
            <Link to="/category/food">food</Link>
          </div>
          <div class="homepage-cat-card cat-home flex-container flex-center-v flex-center-h">
            <Link to="/category/home">home</Link>
          </div>
          <div class="homepage-cat-card cat-office flex-container flex-center-v flex-center-h">
            <Link to="/category/office">office</Link>
          </div>
        </div>
        <div>
          <FeaturedProd />
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
