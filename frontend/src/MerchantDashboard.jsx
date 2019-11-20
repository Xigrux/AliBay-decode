import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedMerchantDashboard extends Component {
  render = () => {
    return (
      <div>
        merchant dash <Link to="/productform">add product</Link>
      </div>
    );
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
