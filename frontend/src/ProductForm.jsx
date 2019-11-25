import React, { Component } from "react";
import { connect } from "react-redux";

import "./style/productform.css";

class UnconnectedProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productDescHeader: "",
      productDescText: "",
      sellerName: this.props.username,
      productLocation: "",
      productCat: "",
      assocTags: "",
      inventory: 0,
      prodPrice: 0,
      files: []
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
  handleDescTextChange = event => {
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
    });
  };
  handleLocationChange = event => {
    console.log("new location: ", event.target.value);
    this.setState({ productLocation: event.target.value });
  };
  handleInventoryChange = event => {
    console.log("product inventory: ", event.target.value);
    this.setState({ inventory: event.target.value });
  };
  handlePriceChange = event => {
    console.log("product price: ", event.target.value);
    this.setState({ prodPrice: event.target.value });
  };

  handleFilesChange = event => {
    console.log("new files: ", event.target.files);
    this.setState({ files: event.target.files });
  };

  // Form submission

  handleSubmit = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("name", this.state.productName);
    data.append("sellerName", this.state.sellerName);
    data.append("descriptionHeader", this.state.productDescHeader);
    data.append("descriptionText", this.state.productDescText);
    data.append("category", this.state.productCat);
    data.append("tags", this.state.assocTags);
    data.append("location", this.state.productLocation);
    data.append("inventory", this.state.inventory);
    data.append("price", this.state.prodPrice);
    if (this.state.files !== undefined) {
      console.log("in append");
      for (let i = 0; i < this.state.files.length; i++) {
        data.append("files", this.state.files[i]);
      }
    } else {
      data.append("files", this.state.files);
    }

    let response = await fetch("/add-product", {
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
    this.setState({
      productName: "",
      productDescHeader: "",
      productDescText: "",
      productLocation: "",
      productCat: "",
      assocTags: "",
      inventory: 0,
      prodPrice: 0,
      files: []
    });
    window.alert("Product submitted");
  };
  render = () => {
    return (
      <section>
        <h2>Add a product</h2>
        <form onSubmit={this.handleSubmit}>
          <div class="productpage-container">
            {/* NAME */}
            <div class="productpage-input">
              <label htmlFor="prod-name">Product Name</label>
              <input
                id="prod-name"
                type="text"
                value={this.state.productName}
                onChange={this.handleNameChange}
                required
              />
            </div>
            {/* DESC */}
            <div class="productpage-input">
              <label htmlFor="prod-desc-header">Description Title</label>
              <input
                id="prod-desc-header"
                type="text"
                value={this.state.productDescHeader}
                onChange={this.handleDescHeaderChange}
                required
              />
            </div>
            <div class="productpage-input">
              <label htmlFor="prod-desc-text">Description Body</label>
              <textarea
                id="prod-desc-text"
                type="text"
                value={this.state.productDescText}
                onChange={this.handleDescTextChange}
                required
                cols="40"
                rows="5"
              ></textarea>
            </div>
            {/* CATEGORY */}
            <div class="productpage-input">
              <label htmlFor="prod-category">Pick a Category</label>
              <form class="prod-radios flex-container flex-wrap" required>
                <input
                  id="prod-cat-ele"
                  type="radio"
                  class="hidden productform"
                  name="category-select"
                  value="electronic"
                  onClick={this.handleCategoryChange}
                />
                <label For="prod-cat-ele">Electronics</label>
                <input
                  id="prod-cat-food"
                  type="radio"
                  class="hidden productform"
                  name="category-select"
                  value="food"
                  onClick={this.handleCategoryChange}
                />
                <label For="prod-cat-food">Food</label>
                <input
                  id="prod-cat-home"
                  type="radio"
                  class="hidden productform"
                  name="category-select"
                  value="home"
                  onClick={this.handleCategoryChange}
                />
                <label For="prod-cat-home">Home</label>
                <input
                  id="prod-cat-office"
                  type="radio"
                  class="hidden productform"
                  name="category-select"
                  value="office"
                  onClick={this.handleCategoryChange}
                />
                <label For="prod-cat-office">Office</label>
              </form>
            </div>
            {/* TAGS */}
            <div class="productpage-input">
              <label htmlFor="prod-tags">
                Product Tags
                <div>
                  <small>Separate by spaces</small>
                </div>
              </label>
              <input
                id="prod-tags"
                type="text"
                value={this.state.assocTags}
                onChange={this.handleTagChange}
              />
            </div>
            {/* LOCATION */}
            <div class="productpage-input">
              Select product location:
              <form class="prod-radios flex-container flex-wrap" required>
                <input
                  type="radio"
                  class="hidden productform"
                  id="region-select-americas"
                  name="region-select"
                  value="Americas"
                  onClick={this.handleLocationChange}
                />
                <label For="region-select-americas">Americas</label>
                <input
                  type="radio"
                  class="hidden productform"
                  id="region-select-asia"
                  name="region-select"
                  value="Asia"
                  onClick={this.handleLocationChange}
                />
                <label For="region-select-asia">Asia</label>
                <input
                  type="radio"
                  class="hidden productform"
                  id="region-select-europe"
                  name="region-select"
                  value="Europe"
                  onClick={this.handleLocationChange}
                />
                <label For="region-select-europe">Europe</label>
                <input
                  type="radio"
                  class="hidden productform"
                  id="region-select-africa"
                  name="region-select"
                  value="Africa"
                  onClick={this.handleLocationChange}
                />
                <label For="region-select-africa">Africa</label>
                <input
                  type="radio"
                  class="hidden productform"
                  id="region-select-oceania"
                  name="region-select"
                  value="Oceania"
                  onClick={this.handleLocationChange}
                />
                <label For="region-select-oceania">Oceania</label>
              </form>
            </div>
            {/* INVENTORY */}
            <div class="productpage-input">
              <label htmlFor="prod-inventory">Inventory</label>
              <input
                id="prod-inventory"
                type="number"
                min="0"
                value={this.state.inventory}
                onChange={this.handleInventoryChange}
                required
              />
            </div>
            {/* PRICE */}
            <div class="productpage-input">
              <label htmlFor="prod-price">Price</label>
              <input
                id="prod-price"
                type="number"
                min="0.01"
                step="0.01"
                value={this.state.prodPrice}
                onChange={this.handlePriceChange}
                required
              />
            </div>
            {/* IMAGES */}
            <div class="productpage-input">
              <label htmlFor="prod-images">Product images</label>
              <div>
                <input
                  id="prod-images"
                  type="file"
                  onChange={this.handleFilesChange}
                  name="files"
                  multiple
                />
              </div>
            </div>
            <div class="bump-button">
              <button type="submit">Add product</button>
            </div>
          </div>
        </form>
      </section>
    );
  };
}

let mapStateToProps = state => {
  return {
    username: state.user.username
  };
};

// connect component to Provider and store
let ProductForm = connect(mapStateToProps)(UnconnectedProductForm);

export default ProductForm;
