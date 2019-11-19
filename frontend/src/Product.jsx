import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      sellerName: "", // FIX ME
      productDesc: "",
      productCat: "",
      assocTags: [],
      productLocation: "",
      productImages: [], // FIX ME
      inventory: 0,
      dateOfPublication: "",
      rating: 0
    };
  }

  // onChange handlers for each property of state

  handleNameChange = event => {
    console.log("new product name: ", event.target.value);
    this.setState({ productName: event.target.value });
  };
  handleDescriptionChange = event => {
    console.log("new description: ", event.target.value);
    this.setState({ productDesc: event.target.value });
  };
  handleCategoryChange = event => {
    console.log("new category: ", event.target.value);
    this.setState({ productCat: event.target.value });
  };
  handleTagChange = event => {
    console.log("new tags: ", event.target.value);
    this.setState({ assocTags: event.target.value }); // push to array
  };
  handleLocationChange = event => {
    console.log("new location: ", event.target.value);
    this.setState({ productLocation: event.target.value });
  };
  // handleImagesChange = event => {
  //   console.log("new product name", event.target.value);
  //   this.setState({ productName: event.target.value });
  // };
  handleInventoryChange = event => {
    console.log("product inventory: ", event.target.value);
    this.setState({ inventory: event.target.value });
  };
  handleDateChange = event => {
    console.log("publication date: ", event.target.value);
    this.setState({ dateOfPublication: event.target.value });
  };
  handleRatingChange = event => {
    console.log("new rating: ", event.target.value);
    this.setState({ rating: event.target.value });
  };

  // Form submission

  handleSubmit = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("name", this.state.productName);
    data.append("desc", this.state.productDesc);
    data.append("category", this.state.productCat);
    data.append("tags", this.state.assocTags);
    data.append("location", this.state.productLocation);
    data.append("inventory", this.state.inventory);
    data.append("publicationDate", this.state.dateOfPublication);
    data.append("rating", this.state.rating);
    let response = await fetch("/FIXME", {
      // fix fetch request path
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    console.log("response body: ", responseBody);
    let parsedBody = JSON.parse(responseBody);
    console.log("parsed body: ", parsedBody);
    if (!parsedBody.success) {
      window.alert("Product submission failed");
      return;
    }
    // NEEDS IMAGES AND SELLER NAME
  };
  render = () => {
    return (
      <div>
        <h2>New Product</h2>
        <form onSubmit={this.handleSubmit}>
          <span>Name</span>
          <input type="text" onChange={this.handleNameChange} />
          <span>Description</span>
          <input type="text" onChange={this.handleDescriptionChange} />
          <span>Category</span>
          <input type="text" onChange={this.handleCategoryChange} />
          <span>Tags</span>
          <input type="text" onChange={this.handleTagChange} />
          <span>Location</span>
          <input type="text" onChange={this.handleLocationChange} />
          <span>Inventory</span>
          <input type="text" onChange={this.handleInventoryChange} />
          <span>Publication date</span>
          <input type="text" onChange={this.handleDateChange} />
          <span>Rating</span>
          <input type="text" onChange={this.handleRatingChange} />
          <input type="submit" value="Submit product" />
        </form>
      </div>
    );
  };
}

// connect component to Provider and store

let Product = connect()(UnconnectedProduct);

export default Product;
