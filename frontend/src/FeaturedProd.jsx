import React, { Component } from "react";
import ProductCard from "./ProductCard.jsx";

class FeaturedProd extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount = () => {
    this.getTenObjects();
  };

  getTenObjects = async () => {
    let data = new FormData();
    data.append("category", "featured");
    let response = await fetch("/render-category", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    console.log("parsed", parsed);
    this.setState({ items: parsed.items });
  };
  render = () => {
    return (
      <div>
        {this.state.items.map(item => {
          return <ProductCard itemContents={item} />;
        })}
      </div>
    );
  };
}

export default FeaturedProd;
