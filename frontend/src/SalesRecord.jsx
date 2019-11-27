import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";

class UnconnectedSalesRecord extends Component {
  constructor() {
    super();
    this.state = {
      record: [],
      displayItems: {}
    };
  }
  componentDidMount = async () => {
    let salesRecord = await this.getSalesRecord();
    console.log("sales record: ", salesRecord);
    let display = {};
    this.props.merchant.salesHistory.forEach(item => {
      if (display[item.itemId] === undefined) {
        display[item.itemId] = item.quantity;
      } else {
        display[item.itemId] += item.quantity;
      }
    });
    this.setState({ displayItems: display });
    if (salesRecord) {
      this.setState({ record: salesRecord });
    }
  };

  getSalesRecord = async () => {
    let data = new FormData();
    data.append(
      "salesRecord",
      JSON.stringify(this.props.merchant.salesHistory)
    );

    let response = await fetch("/sales-record", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);

    if (parsed.success) {
      return parsed.POs;
    } else {
      return false;
    }
  };

  render = () => {
    return (
      <div>
        {console.log(
          "MERCHANT SHISTORY ON SERECORD",
          this.props.merchant.salesHistory,
          "this.state.displayItems",
          this.state.displayItems
        )}

        {this.state.record.map(sale => {
          let quantity = this.state.displayItems[sale._id];
          return (
            <div class="item-card">
              <b>{sale.productName}</b> : {quantity} units
              <div>
                <Link to={"/product/" + sale._id}>
                  <small class="explicit-link">{sale._id}</small>
                </Link>
              </div>
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
