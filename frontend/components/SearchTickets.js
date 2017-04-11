import React, { Component } from 'react';
import flags from "../lib/flags";

export default class SearchTickets extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}
	render() {
		let props = this.props;
	    return (
	      <div className="SearchTickets">
	    	<p>Найти рейсы</p>
	      </div>
	    );
	}
}
