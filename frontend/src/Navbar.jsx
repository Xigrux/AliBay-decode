import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { IconContext } from "react-icons";
import { FiSearch, FiShoppingBag } from "react-icons/fi";

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
          <>
            <h3>{this.props.user.username}</h3>
            <button onClick={this.logOut}>log-out</button>
          </>
        )}

        <form class="seachbar">
          <input
            class="search-input"
            type="text"
            onChange={this.handleSearchChange}
          ></input>
          <button onClick="submit" class="search-button">
            <IconContext.Provider value={{ className: "search-icon" }}>
              <FiSearch />
            </IconContext.Provider>
          </button>
        </form>

        <div class="cart flex-container flex-center-h flex-center-v">
          <Link to="/cart">
            <IconContext.Provider value={{ className: "cart-icon" }}>
              <FiShoppingBag />
            </IconContext.Provider>
          </Link>
          <div class="cart-quantity circle flex-container flex-center-h flex-center-v">
            3
          </div>
        </div>
      </nav>
    );
  };
}

let mapStateToProps = st => {
  return { isLoggedIn: st.loggedIn, user: st.user };
};

let Navbar = connect(mapStateToProps)(UnconnecterNavbar);

export default Navbar;
