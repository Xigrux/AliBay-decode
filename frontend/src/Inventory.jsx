import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard.jsx";

let inventory = [
  {
    _id: 12212,
    productName: "Ahhhh",
    descriptionHeader: "sadasdss",
    posts: 1,
    price: "44.44",
    ratings: 1,
    inventory: 1
  }
];

class UnconnectedInventory extends Component {
  render = () => {
    return (
      // UNCOMMENT CODE BELOW AND REMOVE DUMMY DATA ABOVE ONCE ACTUAL DATA IS ACTIVE
      //   <>
      //     {this.props.user.inventory.map(item => {
      //       return <ProductCard itemContents={item} />;
      //     })}
      //   </>
      <>
        {inventory.map(item => {
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
