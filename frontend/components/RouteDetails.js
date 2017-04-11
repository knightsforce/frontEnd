import React, { Component } from 'react';
import flags from "../lib/flags";

export default class RouteDetails extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			buttonVisible: !props.directions.to.date,
		};
	}
	render() {
		let props = this.props;
		let directions = props.directions;
		let elems = [dateBlock({text: "Туда", date: directions.from.date})];
	    
	    if(this.state.buttonVisible) {
	    	elems.push(<button type="button" className="add">+ Обратно</button>);
	    } else {
	    	elems.push(dateBlock({text: "Обратно", date: directions.to.date}));
	    }

	    return (
	      <div className="RouteDetails">
	    	<div className="wrap">
	    		{elems}
	    	</div>
	      </div>
	    );
	}
}

function dateBlock(props) {
	return(
		<div className="date-block">
			<span>{props.text}</span>
			<p>{props.date}</p>
		</div>
	);
}