import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";
import "./style/categorypage.css";

class UnconnectedSearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      tagButtons: []
    };
  }
  componentDidMount() {
    //generates the new tags based on the given search results
    this.genFilterTags();
  }
  componentDidUpdate(prevProps) {
    if (this.props.results.array !== prevProps.results.array) {
      this.genFilterTags();
    }
  }
  genFilterTags = () => {
    //gets all of the tags from the each of the items
    let allTags = [];
    if (this.props.results.array === undefined) {
      return;
    }
    this.props.results.array.forEach(item => {
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

  render() {
    console.log("tags found for querried items:", this.state.tagButtons);
    if (this.props.results.array === undefined) {
      return <div>No Search made...</div>;
    }
    if (this.props.results.array[0] === undefined) {
      return <div>No search results...</div>;
    }
    //creates a button element for each of the tagButtons stored in the state
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
    //creates a product card for each of the items found in the search
    let itemCards = this.props.results.array.map(item => {
      return <ProductCard itemContents={item}></ProductCard>;
    });

    if (this.state.filters[0] !== undefined) {
      this.state.filters.forEach(tag => {
        itemCards = itemCards.filter(itemCard => {
          return itemCard.props.itemContents.tags.includes(tag);
        });
      });
    }

    console.log("Items found:", this.props.results.array);
    return (
      <section>
        <h1>Search Results:</h1>
        <details class="categorypage-filter-conatiner">
          <summary>Filters</summary>
          <div class="categorypage-taglist flex-container flex-center-v">
            {tagButtons}
          </div>
        </details>
        <div class="homepage-card-containter">{itemCards}</div>
      </section>
    );
  }
}

let mapStateToProps = st => {
  return {
    results: st.searchResult
  };
};

let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);

export default SearchResults;
