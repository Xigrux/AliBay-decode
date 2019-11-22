import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedMerchantPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchant: {}
    };
  }
  componentDidMount = async () => {
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
    this.setState({ merchant: parsed.merchant });
  };

  render = () => {
    console.log("SELLER:::::", this.props.id);
    // return <div>hello: {this.props.id}</div>;
    console.log("MERCHANT:::::", this.state.merchant);

    return (
      <>
        <div>{this.state.merchant.username}</div>
        <div>{this.state.merchant.region}</div>
        <div>{this.state.merchant.email}</div>
        <div>{this.state.merchant.inventory}</div>
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
