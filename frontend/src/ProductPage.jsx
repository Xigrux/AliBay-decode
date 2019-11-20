import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class unconnectedProductPage extends Component {
  render = () => {
    return <>item page</>;
  };
}

let ProductPage = connect()(unconnectedProductPage);

export default ProductPage;
