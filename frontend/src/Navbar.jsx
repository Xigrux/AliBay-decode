import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
      <div>
        {/* Cart button will go here */}
        <b>Cart</b>
        {/* //If  the user is not currently logged In - display Links to the Login an Signup forms */}
        {!this.props.isLoggedIn && (
          /*Link to the Login and Signup components */ <div>
            <Link to="/login">Log-in</Link> - <Link to="/signup">Signup</Link>
          </div>
        )}
        {this.props
          .isLoggedIn /*Will display the name of the current user and will link to that user's profile aswell as a log out button if the user is logged in*/ && (
          <div>
            <h3>{this.props.user}</h3>
            <button onClick={this.logOut}>log-out</button>
          </div>
        )}
        <form>
          <input
            type="text"
            placeholder="Search..."
            onChange={this.handleSearchChange}
          ></input>
          <input type="button" value="Search"></input>
        </form>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return { isLoggedIn: st.loggedIn, user: st.username };
};

let Navbar = connect(mapStateToProps)(UnconnecterNavbar);

export default Navbar;
