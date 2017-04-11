import React, { Component } from 'react';
import flags from "../lib/flags";

import Reference from "./Reference";

export default class Head extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}
	render() {
		let props = this.props;
	    return (
	      <div className="Head">
	    	<Reference/>
	      </div>
	    );
	}
}
