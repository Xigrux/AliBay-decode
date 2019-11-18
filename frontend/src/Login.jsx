import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount = () => {
    let autoLogin = async () => {
      console.log("auto-login hit");
      await fetch("/autologin", {
        method: "POST"
      });
      this.props.dispatch({ type: "login-success" });
    };
    autoLogin();
  };

  handleUsernameChange = event => {
    console.log("new login username", event.target.value);
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    console.log("new login password", event.target.value);
    this.setState({ password: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log("login form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
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
    this.props.dispatch({ type: "login-success" });
  };

  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        Username
        <input type="text" onChange={this.handleUsernameChange} />
        Password
        <input type="text" onChange={this.handlePasswordChange} />
      </form>
    );
  };
}

let Login = connect()(UnconnectedLogin);

export default Login;
