import React, { Component } from 'react';
import flags from "../lib/flags";

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    let props = this.props;
    return (
      <div className="Loading" style={props.style}>
        <div className="sidebar"></div>
      </div>
    );
  }
}