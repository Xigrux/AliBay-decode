import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";

class UnconnectedSearchResults extends Component {
  componentDidMount() {}
  render() {
    if (this.props.results.array === undefined) {
      return <div>No Search made...</div>;
    }
    if (this.props.results.array[0] === undefined) {
      return <div>No search results...</div>;
    }
    let itemCards = this.props.results.array.map(item => {
      return <ProductCard itemContents={item}></ProductCard>;
    });

    console.log(this.props.results.array[0]);
    return (
      <div>
        <h1>Search Results:</h1>
        <div>{itemCards}</div>
      </div>
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
