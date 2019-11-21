import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard.jsx";

class UnconnectedPurchaseHistory extends Component {
  render = () => {
    return (
      <div>
        {this.props.user.purchased.map(item => {
          return <ProductCard itemContents={item} />;
        })}
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    user: state.user
  };
};

let PurchaseHistory = connect(mapStateToProps)(UnconnectedPurchaseHistory);

export default PurchaseHistory;
