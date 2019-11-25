import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard.jsx";
import "./style/categorypage.css";

//======================dummy data========================

class UnconnectedProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      itemsData: [],
      tagButtons: []
    };
  }
  componentDidMount = () => {
    console.log("product-category mount:", this.props.category);
    this.getItems();
  };
  //requests all the relevant items upon component mount based on the given category prop
  getItems = async () => {
    let category = this.props.category;
    let data = new FormData();
    data.append("category", category);
    let response = await fetch("/render-category", {
      method: "POST",
      body: data
    });
    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ itemsData: body });
    console.log("fetch response for category:", category, ", items:", body);
    //calls method that will generate the appropriate tag filter buttons!
    this.genFilterTags();
  };
  genFilterTags = () => {
    //gets all of the tags from the each of the items
    let allTags = [];
    this.state.itemsData.items.forEach(item => {
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
    //add the tag 'buttons' to the state
    this.setState({ tagButtons: filteredTags });
  };

  handleTagUpdate = event => {
    //if innactive, set the class to active and add the value to the filters array in the state
    console.log(event.target.value);
    if (event.target.classList.contains("innactive")) {
      event.target.classList.remove("innactive");
      event.target.classList.add("active");
      this.setState({ filters: this.state.filters.concat(event.target.value) });
    }
    // if already active, set the calss to innactive and filter out that tag from the filters array in the state
    else if (event.target.classList.contains("active")) {
      event.target.classList.remove("active");
      event.target.classList.add("innactive");
      this.setState({
        filters: this.state.filters.filter(tag => {
          return tag !== event.target.value;
        })
      });
    }
  };

  render = () => {
    console.log("ITEMS IN ITEMDATA !!:", this.state.itemsData);
    let tagButtons = this.state.tagButtons.map(tag => {
      //"-" in place temporarily to visually differenciate the buttons
      return (
        <>
          <input
            id={"prod-tag-" + tag}
            class="hidden producttag innactive"
            value={tag}
            type="checkbox"
            onChange={this.handleTagUpdate}
          />
          <label for={"prod-tag-" + tag}>{tag}</label>
        </>
      );
    });
    //Creates a product card component for each of the Items in the items array
    console.log("state items:", this.state.itemsData);
    let itemCards = <div>-</div>;
    if (this.state.itemsData.items !== undefined) {
      itemCards = this.state.itemsData.items.map(item => {
        return <ProductCard itemContents={item}></ProductCard>;
      });

      // if there are filters in place, modify the itemCards array
      if (this.state.filters[0] !== undefined) {
        this.state.filters.forEach(tag => {
          itemCards = itemCards.filter(itemCard => {
            return itemCard.props.itemContents.tags.includes(tag);
          });
        });
      }
    } else {
      itemCards = <div>Loading...</div>;
    }
    let style = {
      backgroundImage: "url(/img/" + this.props.category + ".jpg)"
    };

    return (
      <div>
        <div
          class="categorypage-hero flex-container flex-center-v flex-center-h"
          style={style}
        >
          {this.props.category}
        </div>
        <section>
          <details class="categorypage-filter-conatiner">
            <summary>Filters</summary>
            <div class="categorypage-taglist flex-container flex-center-v">
              {tagButtons}
            </div>
          </details>
          <div class="homepage-card-containter"> {itemCards}</div>
        </section>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return { username: st.username };
};

let ProductCategory = connect(mapStateToProps)(UnconnectedProductCategory);

export default ProductCategory;
