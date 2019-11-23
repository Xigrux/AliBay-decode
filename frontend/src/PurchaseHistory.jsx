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
    data.append("purchaseOrders", JSON.stringify(this.props.user.purchased));
    let response = await fetch("/purchase-history", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    console.log(parsed);
    if (parsed.success) {
      return parsed.POs;
    } else {
      return false;
    }
  };
  componentDidMount = async () => {
    let purchasedHistory = await this.getPurchaseHistory();
    // console.log("purchased history: ", purchasedHistory);
    if (purchasedHistory) {
      this.setState({ history: purchasedHistory });
    }
  };

  render = () => {
    return (
      <div>
        {this.state.history.map(PO => {
          let total = 0;
          return (
            <div>
              {PO.purchaseOrder.map(item => {
                total += item.item.price * item.quantity;
                return (
                  <div style={{ marginTop: "15px" }}>
                    <div>
                      Product:
                      {item.item.productName}
                    </div>
                    <div>
                      Price:
                      {item.item.price}
                    </div>
                    <div>
                      Quantity bought:
                      {item.quantity}
                    </div>
                  </div>
                );
              })}
              Total: {total}
            </div>
          );
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
