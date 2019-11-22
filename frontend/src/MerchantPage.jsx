import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";

class UnconnectedMerchantPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchant: {},
      inventory: []
    };
  }
  componentDidMount = () => {
    this.getMerchant();
    this.getInventory();
  };

  getMerchant = async () => {
    let data = new FormData();
    data.append("sellerId", this.props.id);
    let response = await fetch("/merchant-page", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    console.log("MERCHANT-PAGE RESP****", responseBody);
    let parsed = JSON.parse(responseBody);
    console.log("Parsed RESP****", parsed);
    if (parsed.success) {
      this.setState({ merchant: parsed.merchant });
    }
  };

  getInventory = async () => {
    let data = new FormData();
    data.append("items", this.props.id);
    let response = await fetch("/inventory", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    console.log("Inventory RESP****", responseBody);
    let parsed = JSON.parse(responseBody);
    console.log("Parsed RESP****", parsed);
    if (parsed.success) {
      this.setState({ inventory: parsed.items });
    }
  };

  render = () => {
    console.log("SELLER:::::", this.props.id);
    // return <div>hello: {this.props.id}</div>;
    console.log("MERCHANT:::::", this.state.merchant);
    console.log("INVENTORY::::::::", this.state.inventory);

    return (
      <>
        <div>{this.state.merchant.username}</div>
        <div>{this.state.merchant.region}</div>
        <div>{this.state.merchant.email}</div>
        <div>
          {this.state.inventory.map(item => {
            console.log("STATE INVENTORY ITEM", item);

            return <ProductCard itemContents={item} />;
          })}
        </div>
      </>
    );
  };
}

let mapStateToProps = state => {
  return {
    seller: state.user
  };
};

let MerchantPage = connect(mapStateToProps)(UnconnectedMerchantPage);

export default MerchantPage;
