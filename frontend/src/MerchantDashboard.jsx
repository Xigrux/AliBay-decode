import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Inventory from "./Inventory";
import SalesRecord from "./SalesRecord";
import Graph from "./Graph";
import "./style/merchantdashboard.css";

class UnconnectedMerchantDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: "",
      newPassword: ""
    };
  }
  handleEmailChange = event => {
    console.log("new email change", event.target.value);
    this.setState({ newEmail: event.target.value });
  };

  handlePasswordChange = event => {
    console.log("new password change", event.target.value);
    this.setState({ newPassword: event.target.value });
  };

  handleEmailSubmit = async event => {
    event.preventDefault();
    console.log("email change form submit");
    let data = new FormData();
    data.append("id", this.props.user._id);
    data.append("email", this.state.newEmail);
    data.append("signupType", this.props.user.userType);
    let response = await fetch("/update-email", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    console.log("parsed response from update-email endpoint", parsed);
    if (parsed.success) {
      this.setState({ newEmail: "" });
      window.alert("Email updated");
      return;
    }
    window.alert("Something went wrong");
  };

  handlePasswordSubmit = async event => {
    event.preventDefault();
    console.log("password change form submit");
    let data = new FormData();
    data.append("id", this.props.user._id);
    data.append("password", this.state.newPassword);
    data.append("signupType", this.props.user.userType);
    let response = await fetch("/update-password", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    console.log("parsed body from update-password endpoint", parsed);
    if (parsed.success) {
      this.setState({ newPassword: "" });
      window.alert("Password updated");
      return;
    }
    window.alert("Something went wrong");
  };

  render = () => {
    return (
      <section>
        <div class="marchantdash-anchor-container flex-container flex-evenly-h flex-wrap flex-center-v">
          <Link to="/productform">
            <a href="#add-product" class="achor-link">
              + Add a Product
            </a>
          </Link>
          <a href="#inventory" class="achor-link">
            Current Inventory
          </a>
          <a href="#salesrecord" class="achor-link">
            Sales Record
          </a>
          <a href="#credential" class="achor-link">
            Update Credentials
          </a>
        </div>

        <div class="dash-card merchantdash-inventory flex-container  flex-dir-v flex-evenly-h flex-wrap flex-center-v">
          <div class="dash-card-title">Sales Stats</div>
          <Graph />
        </div>

        <div class="flex-container">
          <div
            id="inventory"
            class="dash-card merchantdash-inventory flex-container  flex-dir-v flex-evenly-h flex-wrap flex-center-v"
          >
            <div class="dash-card-title">Inventory</div>
            <div class="merchant-inventory-container">
              <Inventory />
            </div>
          </div>
          <div id="Sales Record" class="dash-card merchantdash-salesrecord ">
            <div class="dash-card-title">Sales Record</div>
            <SalesRecord />
          </div>
        </div>

        <div
          id="credential"
          class="dash-card flex-container flex-dir-v flex-evenly-h flex-wrap flex-center-v"
        >
          <div class="dash-card-title">Account settings</div>
          <div>
            <form onSubmit={this.handleEmailSubmit}>
              <label htmlFor="email">Update email</label>
              <input
                id="email"
                type="text"
                onChange={this.handleEmailChange}
                value={this.state.newEmail}
              />
              <button class="bump-button" type="submit">
                Update
              </button>
            </form>
            <form onSubmit={this.handlePasswordSubmit}>
              <label htmlFor="password">Update password</label>
              <input
                id="password"
                type="password"
                onChange={this.handlePasswordChange}
                value={this.state.newPassword}
              />
              <button class="bump-button" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  };
}

let mapStateToProps = state => {
  return {
    user: state.user
  };
};

let MerchantDashboard = connect(mapStateToProps)(UnconnectedMerchantDashboard);

export default MerchantDashboard;
