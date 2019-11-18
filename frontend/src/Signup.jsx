import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      isMerchant: false
    };
  }

  handleUsernameChange = event => {
    console.log("new username", event.target.value);
    this.setState({ username: event.target.value });
  };

  handleEmailChange = event => {
    console.log("new username", event.target.value);
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };

  handleSignupType = event => {
    console.log("is merchant? ", event.target.checked);
    this.setState({ isMerchant: event.target.checked });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log("Signup form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    if (this.state.isMerchant) {
      data.append("signupType", "merchant");
    } else if (!this.state.isMerchant) {
      data.append("signupType", "user");
    }
    let response = await fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let parsedBody = JSON.parse(responseBody);
    console.log("signup body", parsedBody);

    if (!parsedBody.success) {
      window.alert("Username in use");
      return;
    }
    this.props.dispatch({ type: "login-success" });
  };

  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        Username
        <input type="text" onChange={this.handleUsernameChange} required />
        Email
        <input type="email" onChange={this.handleEmailChange} required />
        Password
        <input type="text" onChange={this.handlePasswordChange} />
        Merchant account
        <input type="checkbox" onChange={this.handleSignupType} />
        <input type="submit" />
      </form>
    );
  };
}

let Signup = connect()(UnconnectedSignup);

export default Signup;
