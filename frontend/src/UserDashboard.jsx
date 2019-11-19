import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedUserDashboard extends Component {
  render = () => {
    return (
      <div>
        <div>
          This account belongs to <strong>{this.props.username}</strong>
        </div>
        <div>{this.props.email}</div>
        <div>{this.props.region}</div>
        <div>{this.props.purchaseHistory}</div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    username: state.user.username,
    email: state.user.email,
    region: state.user.region,
    purchaseHistory: state.user.purchaseHistory
  };
};

let UserDashboard = connect(mapStateToProps)(UnconnectedUserDashboard);

export default UserDashboard;
