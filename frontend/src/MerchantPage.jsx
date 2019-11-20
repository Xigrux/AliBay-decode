import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class unconnectedMerchantPage extends Component {
  render = () => {
    return <>merchant page</>;
  };
}

let MerchantPage = connect()(unconnectedMerchantPage);

export default MerchantPage;
