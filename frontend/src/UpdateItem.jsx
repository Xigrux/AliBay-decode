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
  handleShortDescSubmit = async event => {
    event.preventDefault();
    console.log("new short desc:", this.state.shortDesc);
    let data = new FormData();
    data.append("id", this.props.item);
    data.append("shortDescription", this.state.shortDesc);
    let response = await fetch("/update-item-description-header", {
      method: "POST",
      body: data
    });
    let body = await response.text();
    body = JSON.parse(body);
    if (!body.success) {
      window.alert("something went wrong...");
    }
  };

  handleLongDescChange = event => {
    this.setState({ longDesc: event.target.value });
  };
  handleLongDescSubmit = async event => {
    event.preventDefault();
    console.log("new long desc:", this.state.longDesc);
    let data = new FormData();
    data.append("id", this.props.item);
    data.append("longDescription", this.state.longDesc);
    let response = await fetch("/update-item-description-text", {
      method: "POST",
      body: data
    });
    let body = await response.text();
    body = JSON.parse(body);
    if (!body.success) {
      window.alert("something went wrong...");
    }
  };

  handlePriceChange = event => {
    this.setState({ price: event.target.value });
  };
  handlePriceSubmit = async event => {
    event.preventDefault();
    console.log("new price:", this.state.price);
    let data = new FormData();
    data.append("id", this.props.item);
    data.append("price", this.state.price);
    let response = await fetch("/update-item-price", {
      method: "POST",
      body: data
    });
    let body = await response.text();
    body = JSON.parse(body);
    if (!body.success) {
      window.alert("something went wrong...");
    }
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
