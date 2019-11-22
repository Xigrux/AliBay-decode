import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Inventory from "./Inventory";
import SalesRecord from "./SalesRecord";
import Graph from "./Graph";

class UnconnectedMerchantDashboard extends Component {
  render = () => {
    return (
      <div>
        <div>
          <Graph />
        </div>
        merchant dash <Link to="/productform">add product</Link>
        <div>
          Inventory:
          <Inventory />
        </div>
        <div>
          Items sold:
          {/* <SalesRecord /> UNCOMMENT WHEN WORKING */}
        </div>
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
