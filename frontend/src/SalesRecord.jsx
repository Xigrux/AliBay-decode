import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSalesRecord extends Component {
  render = () => {
    return (
      <div>
        Items sold:
        <div>
          {this.props.merchant.salesHistory.map(sale => {
            return <ProductCard itemContents={sale} />;
          })}
        </div>
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
