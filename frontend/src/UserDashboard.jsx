import React, { Component } from "react";
import { connect } from "react-redux";
import PurchaseHistory from "./PurchaseHistory.jsx";
import { appendFile } from "fs";
import { join } from "path";

import "./style/merchantdashboard.css";

class UnconnectedUserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: "",
      newPassword: ""
    };
  }

  handleEmailChange = event => {
    console.log("new email in input: ", event.target.value);
    this.setState({ newEmail: event.target.value });
  };

  handleEmailSubmit = async event => {
    event.preventDefault();
    console.log("email change form submitted");
    console.log("user", this.props.user);
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
    if (parsed.success) {
      this.setState({ newEmail: "" });
      window.alert("Email updated");
      return;
    }
    window.alert("Something went wrong");
  };

  handlePasswordChange = event => {
    console.log("new password in input: ", event.target.value);
    this.setState({ newPassword: event.target.value });
  };

  handlePasswordSubmit = async event => {
    event.preventDefault();
    console.log("password chage form submitted");
    let data = new FormData();
    data.append("id", this.props.user._id);
    data.append("password", this.state.newPassword);
    data.append("signupType", this.props.signupType);
    let response = await fetch("/update-password", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    console.log("parsed response from /update-password endpoint", parsed);
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
        <div
          class="categorypage-hero flex-container flex-center-v flex-center-h"
          style={{
            backgroundImage: "url(/img/user.jpg)"
          }}
        >
          {this.props.username}
        </div>

        <div class="dash-card dash-title-card flex-container flex-around-h ">
          <div>{this.props.email}</div>
          <div>{this.props.region}</div>
        </div>

        <div class="dash-card flex-container flex-dir-v flex-evenly-h flex-wrap flex-center-v">
          <div class="dash-card-title">Purchase History</div>
          <div class="puchase-item-containter ">
            <PurchaseHistory />
          </div>
        </div>

        <div class="dash-card flex-container  flex-dir-v flex-evenly-h flex-wrap flex-center-v">
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
    username: state.user.username,
    email: state.user.email,
    region: state.user.region,
    purchaseHistory: state.user.purchaseHistory,
    signupType: state.user.userType,
    user: state.user
  };
};

let UserDashboard = connect(mapStateToProps)(UnconnectedUserDashboard);

export default UserDashboard;
