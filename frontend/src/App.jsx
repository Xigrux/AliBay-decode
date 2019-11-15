// PLEASE IMPORT ALL AT THE TOP
import React, { Component } from "react";
import { connect } from "react-redux";

//COMPONENT DECLARATION
class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: ""
    };
  }

  componentDidMount = async () => {
    // fetch test string from explicit endpoint
    let response = await fetch("http://localhost:4000/test");
    let test = await response.text();
    // update state's backend property
    this.setState({ backend: test });
  };

  render() {
    return (
      <>
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
