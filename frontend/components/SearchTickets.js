import React, { Component } from 'react';
import flags from "../lib/flags";

export default class SearchTickets extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.handleClick=this.handleClick.bind(this);
	}
	
	handleClick() {
		this.props.getFlights();
	}

	render() {
		let props = this.props;
	    return (
	      <div className="SearchTickets" onClick={this.handleClick}>
	    	<p>Найти рейсы</p>
	      </div>
	    );
	}
}
