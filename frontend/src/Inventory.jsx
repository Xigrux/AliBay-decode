import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard.jsx";

class UnconnectedInventory extends Component {
  render = () => {
    return (
      <>
        {this.props.user.inventory.map(item => {
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
