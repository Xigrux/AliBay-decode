import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      signupType: "",
      region: ""
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
    console.log("signup type? ", event.target.value);
    this.setState({ signupType: event.target.value });
  };
  handleRegionSelect = event => {
    console.log("Selected Region:", event.target.value);
    this.setState({ region: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log("Signup form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    data.append("signupType", this.state.signupType);
    data.append("region", this.state.region);
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
    this.props.dispatch({
      type: "login-success",
      givenUsername: this.state.username
    });
  };

  render = () => {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          Username
          <input type="text" onChange={this.handleUsernameChange} required />
          Email
          <input type="email" onChange={this.handleEmailChange} required />
          Password
          <input type="text" onChange={this.handlePasswordChange} required />
          {/* ========================SIGNUP TYPES======================= */}
          User account
          <input
            type="radio"
            onChange={this.handleSignupType}
            value="users"
            name="account-type"
            required
          />
          Merchant account
          <input
            type="radio"
            onChange={this.handleSignupType}
            value="merchants"
            name="account-type"
          />
          {/* ===============================REGION SELECTION============================= */}
          Select Region: Americas
          <input
            type="radio"
            name="region-select"
            value="Americas"
            onClick={this.handleRegionSelect}
            required
          />
          Asia
          <input
            type="radio"
            name="region-select"
            value="Asia"
            onClick={this.handleRegionSelect}
          />
          Europe
          <input
            type="radio"
            name="region-select"
            value="Europe"
            onClick={this.handleRegionSelect}
          />
          Africa
          <input
            type="radio"
            name="region-select"
            value="Africa"
            onClick={this.handleRegionSelect}
          />
          Oceania
          <input
            type="radio"
            name="region-select"
            value="Oceania"
            onClick={this.handleRegionSelect}
          />
          <input type="submit" />
        </form>
        <Link to="/login">Login Button</Link>
      </>
    );
  };
}

let Signup = connect()(UnconnectedSignup);

export default Signup;
