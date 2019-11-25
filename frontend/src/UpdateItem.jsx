import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedUpdateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shortDesc: "",
      longDesc: "",
      price: ""
    };
  }
  handleShortDescChange = event => {
    this.setState({ shortDesc: event.target.value });
  };
  handleShortDescSubmit = event => {
    event.preventDefault();
    console.log("new short desc:", this.state.shortDesc);
  };

  handleLongDescChange = event => {
    this.setState({ longDesc: event.target.value });
  };
  handleLongDescSubmit = event => {
    event.preventDefault();
    console.log("new long desc:", this.state.longDesc);
  };

  handlePriceChange = event => {
    this.setState({ price: event.target.value });
  };
  handlePriceSubmit = event => {
    event.preventDefault();
    console.log("new price:", this.state.price);
  };

  render() {
    return (
      <div>
        <b>Update fields:</b>
        <form onSubmit={this.handleShortDescSubmit}>
          Short description:
          <input
            type="text"
            onChange={this.handleShortDescChange}
            required
          ></input>
          <input type="submit"></input>
        </form>
        <form onSubmit={this.handleLongDescSubmit}>
          Long description:
          <input
            type="text"
            onChange={this.handleLongDescChange}
            required
          ></input>
          <input type="submit"></input>
        </form>
        <form onSubmit={this.handlePriceSubmit}>
          Price:
          <input
            type="number"
            min="0"
            onChange={this.handlePriceChange}
            required
          ></input>
          <input type="submit"></input>
        </form>
      </div>
    );
  }
}

let UpdateItem = connect()(UnconnectedUpdateItem);

export default UpdateItem;
