// PLEASE IMPORT ALL AT THE TOP
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";

//COMPONENT DECLARATION
class UnconnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: "",
      database: ""
    };
  }

  componentDidMount = async () => {
    // fetch test string from /test GET endpoint
    let response = await fetch("/test");
    let test = await response.text();

    // update state's properties
    this.setState({ backend: test });
  };
  renderHomepage = () => {
    return (
      <div>
        Homepage route Testing
        <Link to="/login">Login Button - </Link>
        <Link to="/signup">Sign up Button - </Link>
        <Link to="/cart">Cart Button</Link>
      </div>
    );
    //Will return the the Banner, Featured products and the CategoryMenu Components
  };
  renderLogin = () => {
    return <div>Login route test</div>;
  };
  renderSignup = () => {
    return <div>Signup route test </div>;
  };
  renderCart = () => {
    return <div>Render Cart Testing</div>;
    //will list each of the products added to the cart
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
            --
            {this.props.test}, {this.state.backend}
            <Link to="/homepage">Back to homepage</Link>
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
