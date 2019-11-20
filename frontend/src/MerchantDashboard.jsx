import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedMerchantDashboard extends Component {
  render = () => {
    return <div>merchant dash</div>;
  };
}

let mapStateToProps = state => {
  return (
    // username: state.user.username,
    // email: state.user.email,
    // region: state.user.region,
    // purchaseHistory: state.user.purchaseHistory
    <>merchantDash</>
  );
};

let MerchantDashboard = connect(mapStateToProps)(UnconnectedMerchantDashboard);

export default MerchantDashboard;
