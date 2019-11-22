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
    this.setState({ merchant: parsed });
  };

  render = () => {
    console.log("SELLER:::::", this.props.id);
    return <div>hello: {this.props.id}</div>;
    // return (
    //   <>
    //     <div>{this.props.id.username}</div>
    //     <div>{this.props.id.region}</div>
    //     <div>{this.props.id.email}</div>
    //     <div>{this.props.id.inventory}</div>
    //   </>
    // );
  };
}

let mapStateToProps = state => {
  return {
    seller: state.user
  };
};

let MerchantPage = connect(mapStateToProps)(UnconnectedMerchantPage);

export default MerchantPage;
