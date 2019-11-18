// PLEASE IMPORT ALL AT THE TOP
import React, { Component } from "react";
import { connect } from "react-redux";

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
    fdsafjsdlfjl;
    // fetch test string from /textdb GET endpoint
    let responsedb = await fetch("/testdb");
    // parsing the array and only storing the test first obj
    let testdb = JSON.parse(await responsedb.text())[0];

    // update state's properties
    this.setState({ backend: test, database: testdb });
  };

  render() {
    return (
      <>
        {this.props.test}, {this.state.backend}, {this.state.database.test}
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
