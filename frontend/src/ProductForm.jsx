import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      sellerName: this.props.name,
      productDescHeader: "",
      productDescText: "",
      productCat: "",
      assocTags: [],
      productLocation: "",
      inventory: 0,
      dateOfPublication: "",
      files: ""
    };
  }

  // onChange handlers for each property of state

  handleNameChange = event => {
    console.log("new product name: ", event.target.value);
    this.setState({ productName: event.target.value });
  };
  handleDescHeaderChange = event => {
    console.log("new description: ", event.target.value);
    this.setState({ productDescHeader: event.target.value });
  };
  handleDescInfoChange = event => {
    console.log("new description: ", event.target.value);
    this.setState({ productDescText: event.target.value });
  };
  handleCategoryChange = event => {
    console.log("new category: ", event.target.value);
    this.setState({ productCat: event.target.value });
  };
  handleTagChange = event => {
    console.log("new tags: ", event.target.value);
    this.setState({
      assocTags: event.target.value
    }); // push to array
  };
  handleLocationChange = event => {
    console.log("new location: ", event.target.value);
    this.setState({ productLocation: event.target.value });
  };
  handleInventoryChange = event => {
    console.log("product inventory: ", event.target.value);
    this.setState({ inventory: event.target.value });
  };
  handleDateChange = event => {
    console.log("publication date: ", event.target.value);
    this.setState({ dateOfPublication: event.target.value });
  };
  handleFileChange = event => {
    console.log("new files: ", event.target.files);
    this.setState({ files: event.target.files });
  };

  // Form submission

  handleSubmit = async event => {
    event.preventDefault();
    let tags = this.state.assocTags.split(",");
    let data = new FormData();
    data.append("name", this.state.productName);
    data.append("sellerName", this.state.sellerName);
    data.append("description-header", this.state.productDescHeader);
    data.append("description-text", this.state.productDescText);
    data.append("category", this.state.productCat);
    data.append("tags", tags);
    data.append("location", this.state.productLocation);
    data.append("inventory", this.state.inventory);
    data.append("date", this.state.dateOfPublication);
    data.append("media", this.state.files);
    let response = await fetch("/post-item", {
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
          {/* NAME */}
          <label htmlFor="prod-name">Name</label>
          <input id="prod-name" type="text" onChange={this.handleNameChange} />
          {/* DESC */}
          <label htmlFor="prod-desc-header">Description header</label>
          <input
            id="prod-desc-header"
            type="text"
            onChange={this.handleDescHeaderChange}
          />
          <label htmlFor="prod-desc-text">Description text</label>
          <input
            id="prod-desc-text"
            type="text"
            onChange={this.handleDescTextChange}
          />
          {/* CATEGORY */}
          <label htmlFor="prod-category">Category</label>
          <input
            id="prod-category"
            type="text"
            onChange={this.handleCategoryChange}
          />
          {/* TAGS */}
          <label htmlFor="prod-tags">Tags</label>
          <input id="prod-tags" type="text" onChange={this.handleTagChange} />
          {/* LOCATION */}
          <label htmlFor="prod-location">Location</label>
          <input
            id="prod-location"
            type="text"
            onChange={this.handleLocationChange}
          />
          {/* INVENTORY */}
          <label htmlFor="prod-inventory">Inventory</label>
          <input
            id="prod-inventory"
            type="text"
            onChange={this.handleInventoryChange}
          />
          {/* IMAGES */}
          <label htmlFor="prod-images">Product images</label>
          <input
            id="prod-images"
            type="file"
            onChange={this.handleFileChange}
            multiple
          />
          <input type="submit" value="Submit product" />
        </form>
      </div>
    );
  };
}

// connect component to Provider and store

let mapStateToProps = state => {
  return {
    name: state.username
  };
};

let ProductForm = connect(mapStateToProps)(UnconnectedProductForm);

export default ProductForm;
