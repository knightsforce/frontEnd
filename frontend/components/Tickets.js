import React, { Component } from 'react';
import flags from "../lib/flags";

let imgLink = "./public/images/human.png";

export default class Tickets extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}
	render() {
		let props = this.props;
		let counts = props.counts; 
	    return (
	      <div className="Tickets">
	    	<TicketCount count={counts.from.adult} text="Взрослый"/>
	    	<TicketCount count={counts.from.kind} text="От 2-12"/>
	    	<TicketCount count={counts.from.baby} text="От 0-2"/>
	      </div>
	    );
	}
}



class TicketCount extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}
	render() {
		let props = this.props;
		let style = {
			opacity: 0.4,
		};
	    return (
	      <div className="ticket-count">
	    	<div className="add">+</div>
	    	<div
	    		className="wrap"
	    		style={(props.count>0) ? null : style}
	    	>
	    		<p>{props.count}</p>
	    		<img src={imgLink}/>
	    	</div>
	    	<span>{props.text}</span>
	    	<div className="remove">-</div>
	      </div>
	    );
	}
}