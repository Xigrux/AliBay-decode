import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedPurchaseConfirmation extends Component {
  render() {
    console.log("purchaseOrder: ", this.props.purchaseOrder);
    let total = 0;
    return (
      <div>
        {this.props.purchaseOrder.map(item => {
          total += item.item.price * item.quantity;
          return (
            <div style={{ marginTop: "15px" }}>
              <div>
                Product:
                {item.item.productName}
              </div>
              <div>
                Price:<sup>$</sup>
                {item.item.price}
                <small>CAD</small>
              </div>
              <div>
                Quantity bought:
                {item.quantity}
              </div>
              Total: <sup>$</sup>
              {Math.round(total * 100) / 100}
              <small>CAD</small>
            </div>
          );
        })}
      </div>
    );
  }
}

let mapStateToProps = st => {
  return {
    user: st.user,
    purchaseOrder: st.purchaseOrder
  };
};

let PurchaseConfirmation = connect(mapStateToProps)(
  UnconnectedPurchaseConfirmation
);

export default PurchaseConfirmation;
