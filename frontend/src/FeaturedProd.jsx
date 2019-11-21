import React, { Component } from "react";

class FeaturedProd extends Component {
  getTenObjects = async () => {
    let data = new FormData();
    data.append("category", "featured");
    let response = await fetch("/search", {
      method: "POST",
      body: data
    });
    let responseBody = await response.then();
    let parsed = JSON.parse(responseBody);
    return parsed;
  };
  render = () => {
    let items = this.getTenObjects();
    return (
      <div>
        {items.map(item => {
          <ProductCard itemContents={item} />;
        })}
      </div>
    );
  };
}

export default FeaturedProd;
