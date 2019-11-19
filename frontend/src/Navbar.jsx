import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

class UnconnecterNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      search: ""
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
      <nav class="flex-container">
        <button class="cart"></button>

        <form>
          <input type="text" onChange={this.handleSearchChange}></input>
          <button onClick="submit">
            <FiSearch />
          </button>
        </form>

        {!this.props.isLoggedIn && (
          /*Link to the Login and Signup components */ <h3>
            <Link to="/login">Log-in</Link> <Link to="/signup">Signup</Link>
          </h3>
        )}
        {this.props
          .isLoggedIn /*Will display the name of the current user and will link to that user's profile aswell as a log out button if the user is logged in*/ && (
          <div>
            <h3>{this.props.user}</h3>
            <button onClick={this.logOut}>log-out</button>
          </div>
        )}
      </nav>
    );
  };
}

let mapStateToProps = st => {
  return { isLoggedIn: st.loggedIn, user: st.username };
};

let Navbar = connect(mapStateToProps)(UnconnecterNavbar);

export default Navbar;
