import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard.jsx";

class UnconnectedPurchaseHistory extends Component {
  constructor() {
    super();
    this.state = {
      history: []
    };
  }
  getPurchaseHistory = async () => {
    let data = new FormData();
    data.append("purchaseOrders", this.props.user.purchased);
    let response = await fetch("/purchase-history", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      return POs;
    } else {
      return false;
    }
  };
  componentDidMount = () => {
    let purchasedHistory = this.getPurchaseHistory();
    if (!purchasedHistory) {
      this.setState({ history: POs });
    }
  };

  render = () => {
    return (
      <div>
        {this.state.history.map(PO => {
          return PO.purchaseOrder.map(item => {
            return (
              <div>
                <div>
                  {item.item.productName}
                </div>
                <div>
                  {item.item.price}
                </div>
                <div>
                  {item.quantity}
                </div>
              </div>
            );
          });
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
