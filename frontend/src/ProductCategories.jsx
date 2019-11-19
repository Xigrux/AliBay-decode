import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard.jsx";
import Navbar from "./Navbar.jsx";

//======================dummy data========================
let dummyDataItems = [
  {
    id: "111",
    title: "Shoe-box",
    description: "box for shoes to be put in",
    frontEndPath: "",
    tags: ["box", "shoes", "feet", "useful", "voluminous", "apparel"],
    price: "15.00$",
    rating: "4"
  },
  {
    id: "222",
    title: "Nice Pants!",
    description: "the nicest of pants",
    frontEndPath: "",
    tags: ["wearable", "apparel", "legs", "useful"],
    price: "49.00$",
    rating: "4.5"
  },
  {
    id: "333",
    title: "Clown car",
    description: "fits your whole clown posse ",
    tags: ["expensive", "metal", "vehicle", "useful"],
    frontEndPath: "",
    price: "2000.00$",
    rating: "3"
  }
];

class UnconnectedProductCategories extends Component {
  render = () => {
    let itemCards = dummyDataItems.map(item => {
      return (
        <ProductCard
          id={item.id}
          title={item.title}
          frontEndPath={item.frontEndPath}
          description={item.description}
          price={item.price}
          rating={item.rating}
        ></ProductCard>
      );
    });
    return (
      <div>
        {/* <Navbar></Navbar>  navbar has yet to be implemented*/}
        {itemCards}
      </div>
    );
  };
}

let mapStateToProps = st => {
  return { username: st.username };
};

let ProductCategories = connect(mapStateToProps)(UnconnectedProductCategories);

export default ProductCategories;
