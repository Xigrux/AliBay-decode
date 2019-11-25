import React, { Component } from "react";
import { connect } from "react-redux";
import PurchaseHistory from "./PurchaseHistory.jsx";
import { appendFile } from "fs";
import { join } from "path";

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
    data.append("username", this.props.username);
    data.append("password", this.state.newPassword);
    data.append("signupType", this.props.signupType);
    let response = await fetch("/update-password", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parsed(responseBody);
    console.log("parsed response from /update-password endpoint", parsed);
    if (parsed.success) {
      window.alert("Password updated");
      return;
    }
    window.alert("Something went wrong");
  };

  render = () => {
    return (
      <div>
        <div>
          <div>
            This account belongs to <strong>{this.props.username}</strong>
          </div>
          <div>
            {this.props.email}
          </div>
          <div>
            {this.props.region}
          </div>
          <div>
            {this.props.purchaseHistory}
          </div>
        </div>

        <form onSubmit={this.handleEmailSubmit}>
          <label htmlFor="email">Update email</label>
          <input id="email" type="text" onChange={this.handleEmailChange} />
          <input type="submit" />
        </form>
        <form onSubmit={this.handlePasswordSubmit}>
          <label htmlFor="password">Update password</label>
          <input
            id="password"
            type="text"
            onChange={this.handlePasswordChange}
          />
          <input type="submit" />
        </form>
        <div>
          Purchase History
          <PurchaseHistory />
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    username: state.user.username,
    email: state.user.email,
    region: state.user.region,
    purchaseHistory: state.user.purchaseHistory,
    signupType: state.user.singupType,
    user: state.user
  };
};

let UserDashboard = connect(mapStateToProps)(UnconnectedUserDashboard);

export default UserDashboard;
