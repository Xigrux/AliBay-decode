import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard.jsx";

class UnconnectedInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount = async () => {
    let data = new FormData();
    data.append("items", this.props.merchant.inventory);
    let response = await fetch("/inventory", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    console.log("RESPONSE*BODY******FROM INVENTORY ENPOINT", responseBody);
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      console.log("here");
      this.setState({ items: parsed.items });
    }
  };

  render = () => {
    return (
      // UNCOMMENT CODE BELOW AND REMOVE DUMMY DATA ABOVE ONCE ACTUAL DATA IS ACTIVE
      <>
        {console.log("*********************************", this.state.items)}

        {this.state.items.map(item => {
          console.log("mERCHANT.INVENTORY SINGLE ITEM", item);

          return <ProductCard itemContents={item} />;
        })}
      </>
    );
  };
}

let mapStateToProps = state => {
  return {
    merchant: state.user
  };
};

let Inventory = connect(mapStateToProps)(UnconnectedInventory);

export default Inventory;
