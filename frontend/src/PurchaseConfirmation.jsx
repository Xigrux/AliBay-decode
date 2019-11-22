import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedPurchaseConfirmation extends Component {
  render() {
    return <div>Purchase Confirmation Page!</div>;
  }
}

let mapStateToProps = st => {
  return { user: st.user };
};

let PurchaseConfirmation = connect(mapStateToProps)(
  UnconnectedPurchaseConfirmation
);

export default PurchaseConfirmation;
