import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard.jsx";

class UnconnectedSalesRecord extends Component {
  render = () => {
    return (
      <div>
        {console.log(
          "MERCHANT SHISTORY ON SERECORD",
          this.props.merchant.salesHistory
        )}

        {this.props.merchant.salesHistory.map(sale => {
          return (
            <div>
              {Object.keys(sale)}, quantity sold: {Object.values(sale)}
            </div>
          );
        })}
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    merchant: state.user
  };
};

let SalesRecord = connect(mapStateToProps)(UnconnectedSalesRecord);

export default SalesRecord;
