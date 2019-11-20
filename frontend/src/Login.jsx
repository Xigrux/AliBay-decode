import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./style/login.css";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      signupType: "",
      user: undefined
    };
  }
  // UNCOMMENT WHEN ENDPOINT IS ACTIVE
  // componentDidMount = () => {
  //   let autoLogin = async () => {
  //     console.log("auto-login hit");
  //     await fetch("/autologin", {
  //       method: "POST"
  //     });
  //     this.props.dispatch({ type: "login-success" });
  //   };
  //   autoLogin();
  // };

  handleUsernameChange = event => {
    console.log("new login username", event.target.value);
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    console.log("new login password", event.target.value);
    this.setState({ password: event.target.value });
  };

  handleSignupType = event => {
    console.log("login type? ", event.target.value);
    this.setState({ signupType: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log("login form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append(
      "signupType",
      this.state.signupType === "" ? "users" : "merchants"
    );
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("/login endpoint response body: ", responseBody);
    let parsedBody = JSON.parse(responseBody);
    console.log("parsed /login response body: ", parsedBody);
    if (!parsedBody.success) {
      window.alert("Login failed, check your credentials");
      return;
    }
    this.setState({ user: parsedBody.user });
    window.alert("Login successful");
    this.props.dispatch({
      type: "login-success",
      user: this.state.user // LULU UPDATE: SEND OBJECT TO STORE REGION ETC
    });
  };

  render = () => {
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <div class="login-container">
            <span class="login-title">Login as</span>
            <input
              class="hidden login-account"
              id="user"
              type="radio"
              onChange={this.handleSignupType}
              value="users"
              name="account-type"
              checked
            />
            <label class="user" for="user">
              {" "}
              User{" "}
            </label>
            <span style={{ order: 3 }}> or </span>
            <input
              class="hidden login-account"
              id="merchant"
              type="radio"
              onChange={this.handleSignupType}
              value="merchants"
              name="account-type"
            />
            <label class="merchant" for="merchant">
              {" "}
              Merchant{" "}
            </label>
          </div>
          <input
            class="login"
            type="text"
            onChange={this.handleUsernameChange}
            placeholder="Username"
          />
          <span class="input-prompt">></span>
          <input
            class="login"
            type="text"
            onChange={this.handlePasswordChange}
            placeholder="Password"
          />
          <span class="input-prompt">></span>

          <button class="bump-button" type="submit">
            Login
          </button>
        </form>

        <Link to="/signup">
          <button class="subtle-button">signup instead</button>
        </Link>
      </section>
    );
  };
}

let Login = connect()(UnconnectedLogin);

export default Login;
