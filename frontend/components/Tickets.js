import React, { Component } from 'react';
import flags from "../lib/flags";

let imgLink = "./public/images/human.png";

export default class Tickets extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.handleTicket=this.handleTicket.bind(this);
	}

	handleTicket(age, operation) {
		let tickets = this.props.tickets[age];
		switch(operation) {
			case "plus":
				++tickets;
				break;

			case "minus":
				--tickets;
				break; 
		}
		if(this.props.minTickets[age]>tickets) return;
		this.props.setTicket(age, tickets);
	}
	render() {
		let props = this.props;
		let tickets = props.tickets; 
	    return (
	      <div className="Tickets">
	    	<TicketCount
	    		count={tickets.adult}
	    		age="adult"
	    		handleTicket={this.handleTicket}
	    		text="Взрослый"
	    	/>
	    	<TicketCount
	    		count={tickets.kind}
	    		age="kind"
	    		handleTicket={this.handleTicket}
	    		text="От 2-12"
	    	/>
	    	<TicketCount
	    		count={tickets.baby}
	    		age="baby"
	    		handleTicket={this.handleTicket}
	    		text="От 0-2"
	    	/>
	      </div>
	    );
	}
}



class TicketCount extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.handleOperation=this.handleOperation.bind(this);
	}

	handleOperation(operation) {
		this.props.handleTicket(this.props.age, operation);
	}

	render() {
		let props = this.props;
		let style = {
			opacity: 0.4,
		};
	    return (
	      <div className="ticket-count">
	    	<Plus operation="plus" handleOperation={this.handleOperation}/>
	    	<div
	    		className="wrap"
	    		style={(props.count>0) ? null : style}
	    	>
	    		<p>{props.count}</p>
	    		<img src={imgLink}/>
	    	</div>
	    	<span>{props.text}</span>
	    	<Minus operation="minus" handleOperation={this.handleOperation}/>
	      </div>
	    );
	}
}

function Plus(props) {
	let handleClick = ()=>{
		props.handleOperation(props.operation);
	}
	return <div className="add" onClick={handleClick}>+</div>
}

function Minus(props) {
	let handleClick = ()=>{
		props.handleOperation(props.operation);
	}
	return <div className="remove" onClick={handleClick}>-</div>
}