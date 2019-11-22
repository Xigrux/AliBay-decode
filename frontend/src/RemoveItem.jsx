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
  removeItem = async event => {
    event.preventDefault();
    let inCartQty = parseInt(this.props.itemContents.quantity);
    let update = false;
    if (inCartQty - this.state.quantitySelected < 1) {
      update = false;
      console.log("remove it");
    } else {
      update = true;
      console.log("now is ", inCartQty - this.state.quantitySelected);
    }

    let data = new FormData();
    data.append("update", update);
    data.append("quantity", this.state.quantitySelected);
    data.append("userId", this.props.user._id);
    console.log(this.props.itemContents.itemId);
    data.append("productId", this.props.itemContents.itemId);

    let response = await fetch("/remove-from-cart", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsedBody = JSON.parse(responseBody);

    if (!parsedBody.success) {
      window.alert("Product submission failed");
    } else {
      this.props.cart.forEach(i => {
        if (i.itemId === parsedBody.item.itemId) {
          console.log("matching", i.itemId, "and ", parsedBody.item.itemId);
          console.log(typeof this.state.quantitySelected);

          i.quantity = i.quantity - parseInt(this.state.quantitySelected);

          return;
        }
      });

      console.log("this is the Response item", parsedBody.item);

      console.log("this is the new cart obj", this.props.cart);

      this.props.dispatch({
        type: "add-cart",
        cart: this.props.cart.splice(
          0,
          this.props.cart.length,
          ...this.props.cart
        )
      });
    }
  };

  handleQuantity = e => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({ quantitySelected: parseInt(e.target.value) });
  };
  render() {
    return (
      <>
        {this.props.isLoggedIn && this.props.user.userType === "users" && (
          <div class="removeitem-container">
            <button onClick={this.removeItem}>
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
