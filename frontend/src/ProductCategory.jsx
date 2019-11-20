import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard.jsx";

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
//gets all of the tags from the each of the items
let allTags = [];
dummyDataItems.forEach(item => {
  item.tags.forEach(tag => {
    allTags.push(tag);
  });
});
//filters out the duplicate values so as to have unique tag buttons
let filteredTags = [];
allTags.forEach(tag => {
  if (!filteredTags.includes(tag)) {
    filteredTags.push(tag);
  }
});

class UnconnectedProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: []
    };
  }
  componentDidMount = () => {
    console.log("product-category mount:", this.props.category);
  };
  //requests all the relevant items upon component mount based on the given category prop
  getItems = () => {
    let category = this.props.category;
  };
  handleTagUpdate = event => {
    //if innactive, set the class to active and add the value to the filters array in the state
    if (event.target.className === "innactive") {
      event.target.className = "active";
      this.setState({ filters: this.state.filters.concat(event.target.value) });
    }
    // if already active, set the calss to innactive and filter out that tag from the filters array in the state
    else if (event.target.className === "active") {
      event.target.className = "innactive";
      this.setState({
        filters: this.state.filters.filter(tag => {
          return tag !== event.target.value;
        })
      });
    }
  };

  render = () => {
    let tagButtons = filteredTags.map(tag => {
      //"-" in place temporarily to visually differenciate the buttons
      return (
        <button
          value={tag}
          className="innactive"
          onClick={this.handleTagUpdate}
        >
          {tag} -
        </button>
      );
    });
    //Creates a product card component for each of the Items in the items array
    let itemCards = dummyDataItems.map(item => {
      return (
        <ProductCard
          id={item.id}
          title={item.title}
          frontEndPath={item.frontEndPath}
          tags={item.tags}
          description={item.description}
          price={item.price}
          rating={item.rating}
        ></ProductCard>
      );
    });

    // if there are filters in place, modify the itemCards array
    if (this.state.filters[0] !== undefined) {
      console.log("All active filters", this.state.filters);
      this.state.filters.forEach(tag => {
        itemCards = itemCards.filter(itemCard => {
          return itemCard.props.tags.includes(tag);
        });
      });
    }
    return (
      <div>
        {tagButtons}
        {itemCards}
      </div>
    );
  };
}

let mapStateToProps = st => {
  return { username: st.username };
};

let ProductCategory = connect(mapStateToProps)(UnconnectedProductCategory);

export default ProductCategory;
