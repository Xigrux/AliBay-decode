// PLEASE IMPORT ALL AT THE TOP
import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar.jsx";

//COMPONENT DECLARATION
class app extends Component {
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

  render() {
    return (
      <>
        Navbar!:
        <Navbar></Navbar>
        {this.props.test}, {this.state.backend}
      </>
    );
  }
}

//COMPONENT REDUX
// states from store being mapped to the component props
let propList = parentState => {
  return { test: parentState.test };
};
let App = connect(propList)(app);

export default App;
