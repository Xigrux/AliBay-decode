// PLEASE IMPORT ALL AT THE TOP
import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar.jsx";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import ProductCategories from "./ProductCategories.jsx";

//COMPONENT DECLARATION
class UnconnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: "",
      database: ""
    };
  }

  componentDidMount = async () => {};
  renderHomepage = () => {
    return (
      <div>
        Homepage route Testing
        <Link to="/login">Login Button</Link>
        <Link to="/cart">Cart Button</Link>
      </div>
    );
    //Will return the the Banner, Featured products and the CategoryMenu Components
  };
  renderLogin = () => {
    //return <div>Login route test</div>;
    return <Login />;
  };
  renderSignup = () => {
    // return <div>Signup route test </div>;
    return <Signup />;
  };
  renderCart = () => {
    return <div>Render Cart Testing</div>;
    //will list each of the products added to the cart
  };
  renderProductCategories = () => {
    //the route to the product categories page
    return <ProductCategories></ProductCategories>;
  };
  renderProduct = routerData => {
    let id = routerData.match.params.productId;
    return (
      <div>
        Product page route test : <i>{id}</i>
      </div>
    );
  };
  renderUserDashboard = () => {
    return <b>User dashboard route test</b>;
  };
  renderMerchantDash = () => {
    return <i>merchant dashboard route test</i>;
  };
  render() {
    return (
      <>
        <BrowserRouter>
          <div>
            <Route path="/" exact={true} render={this.renderHomepage} />
            <Route path="/login" exact={true} render={this.renderLogin} />
            <Route path="/signup" exact={true} render={this.renderSignup} />
            <Route path="/cart" exact={true} render={this.renderCart} />
            <Route
              path="/product-categories"
              exact={true}
              render={this.renderProductCategories}
            />
            <Route
              path="/product/:productId"
              exact={true}
              render={this.renderProduct}
            />
            <Route
              path="/user-dashboard"
              exact={true}
              render={this.renderUserDashboard}
            />
            <Route
              path="/merchant-dashboard"
              exact={true}
              render={this.renderMerchantDash}
            />
            <Link to="/">Back to homepage</Link>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

//COMPONENT REDUX
// states from store being mapped to the component props
let propList = parentState => {
  return { test: parentState.test };
};
let App = connect(propList)(UnconnectedApp);

export default App;
