import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      sellerName: "",
      productDesc: "",
      productCat: "",
      assocTags: "",
      productLocation: "",
      productImages: [],
      inventory: 0,
      dateOfPublication: "",
      rating: 0
    };
  }
  handleProductChange = event => {
    console.log("new product name", event.target.value);
    this.setState({ productName: event.target.value });
  };
  handleProductDesc = event => {
    console.log("new product name", event.target.value);
    this.setState({ productDesc: event.target.value });
  };
  handleProductChange = event => {
    console.log("new product name", event.target.value);
    this.setState({ productName: event.target.value });
  };
}

let Product = connect()(UnconnectedProduct);

export default Product;
