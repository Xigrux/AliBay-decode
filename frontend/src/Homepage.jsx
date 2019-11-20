import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnecterHomepage extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div>
        <div>hero</div>
        <div>
          link to cat
          <Link to="/category/keyboards">keyboard</Link>
        </div>
        <div>featured prod</div>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return {};
};

let Homepage = connect(mapStateToProps)(UnconnecterHomepage);

export default Homepage;
