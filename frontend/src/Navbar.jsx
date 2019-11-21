import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { IconContext } from "react-icons";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import Login from "./Login.jsx";

class UnconnecterNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      search: undefined
    };
  }
  handleSearchChange = event => {
    console.log(event.target.value);
    this.setState({ search: event.target.value });
  };
  handleSearchSubmit = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("tags", this.state.search);
    let response = await fetch("/search", { method: "POST", body: data });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("search response body:", body);
  };
  logOut = () => {
    this.props.dispatch({ type: "logout-success" });
  };

  render = () => {
    return (
      <nav class="flex-container flex-center-v">
        <Link to="/" class="logo">
          <img src="/img/logo.png" alt="alibay logo" height="25" width="logo" />
        </Link>

        {!this.props.isLoggedIn && (
          /*Link to the Login and Signup components */
          <button class="user">
            <Link to="/dashboard">Login</Link>
          </button>
        )}

        {this.props.isLoggedIn && (
          /*Will display the name of the current user and will link to that user's profile aswell as a log out button if the user is logged in*/
          <div>
            <Link to="/dashboard">
              <div>{this.props.user.username}</div>
            </Link>
            <button onClick={this.logOut}>log-out</button>
          </div>
        )}

        <form class="seachbar" onSubmit={this.handleSearchSubmit}>
          <input
            class="search-input"
            type="text"
            onChange={this.handleSearchChange}
          ></input>
          <button type="submit" class="search-button">
            <IconContext.Provider value={{ className: "search-icon" }}>
              <FiSearch />
            </IconContext.Provider>
          </button>
        </form>

        {this.props.isLoggedIn && this.props.user.userType === "users" && (
          <div class="cart flex-container flex-center-h flex-center-v">
            <>
              <Link to="/cart">
                <IconContext.Provider value={{ className: "cart-icon" }}>
                  <FiShoppingBag />
                </IconContext.Provider>
              </Link>
            </>
            <div class="cart-quantity circle flex-container flex-center-h flex-center-v">
              {this.props.cart.length}
            </div>
          </div>
        )}

        {!this.props.isLoggedIn && (
          <div class="cart flex-container flex-center-h flex-center-v">
            <>
              <Link to="/dashboard">
                <IconContext.Provider value={{ className: "cart-icon" }}>
                  <FiShoppingBag />
                </IconContext.Provider>
              </Link>
            </>
            <div class="cart-quantity circle flex-container flex-center-h flex-center-v">
              0
            </div>
          </div>
        )}
      </nav>
    );
  };
}

let mapStateToProps = st => {
  return { isLoggedIn: st.loggedIn, user: st.user, cart: st.cart };
};

let Navbar = connect(mapStateToProps)(UnconnecterNavbar);

export default Navbar;
