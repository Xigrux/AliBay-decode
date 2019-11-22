import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./style/removeitem.css";

class UnconnectedRemoveItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantitySelected: 1
    };
  }
  handleAddToCart = async event => {};

  handleQuantity = e => {
    e.preventDefault();
    this.setState({ quantitySelected: e.target.value });
  };
  render() {
    return (
      <>
        {this.props.isLoggedIn && this.props.user.userType === "users" && (
          <div class="removeitem-container">
            <button onClick={this.handleAddToCart}>
              <Link>
                {/* <Link to="/cart"> */}
                REMOVE
              </Link>
            </button>
            <input
              type="number"
              placeholder="1"
              min="0"
              max={this.props.inventory}
              onChange={this.handleQuantity}
              class="addtocart-input"
            />
          </div>
        )}
      </>
    );
  }
}

let mapStateToProps = st => {
  return {
    isLoggedIn: st.loggedIn,
    user: st.user,
    cart: st.cart
  };
};

let RemoveItem = connect(mapStateToProps)(UnconnectedRemoveItem);

export default RemoveItem;
