import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Inventory from "./Inventory";
import SalesRecord from "./SalesRecord";
import Graph from "./Graph";

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
      <div>
        <div>Account settings</div>
        <form onSubmit={this.handleEmailSubmit}>
          <label htmlFor="email">Update email</label>
          <input
            id="email"
            type="text"
            onChange={this.handleEmailChange}
            value={this.state.newEmail}
          />
          <input type="submit" />
        </form>
        <form onSubmit={this.handlePasswordSubmit}>
          <label htmlFor="password">Update password</label>
          <input
            id="password"
            type="password"
            onChange={this.handlePasswordChange}
            value={this.state.newPassword}
          />
          <input type="submit" />
        </form>
        <div>
          <Graph />
        </div>
        merchant dash <Link to="/productform">add product</Link>
        <div>
          Inventory:
          <Inventory />
        </div>
        <div>
          Sales history:
          <SalesRecord />
        </div>
      </div>
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
