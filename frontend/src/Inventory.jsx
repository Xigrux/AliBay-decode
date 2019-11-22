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

  componentDidMount = () => {
    this.props.merchant.inventory.map(item => {
      console.log("mERCHANT.INVENTORY SINGLE ITEM", item);

      return <ProductCard itemContents={item} />;
    });
  };

  render = () => {
    return (
      // UNCOMMENT CODE BELOW AND REMOVE DUMMY DATA ABOVE ONCE ACTUAL DATA IS ACTIVE
      <>
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
