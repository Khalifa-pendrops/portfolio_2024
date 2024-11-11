import React, { Component } from "react";
import PropTypes from "prop-types";
import DeleteAfterUse from "./DeleteAfterUse";

class DeleteThisToo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "Wetin be this?",
    };
  }

  handleClick() {
      console.log("Button clicked just now");
      this.setState({
          message: "Good Morning!"
      })
  }
  // const { name, heroName } = props;
  render() {
    return (
      <div>
        {/* <h1>{this.state.message}</h1>
        <h1>
          Hello {this.props.name} and {this.props.heroName}
        </h1>
        <button onClick={this.handleClick}>Click me please</button> */}
            <h1>{this.}</h1>
            
      </div>
    );
  }
}
DeleteThisToo.propTypes = {
  name: PropTypes.string.isRequired,
  heroName: PropTypes.string.isRequired,
};
export default DeleteThisToo;
