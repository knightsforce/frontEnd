import React, { Component } from 'react';
import flags from "../lib/flags";
import {formatDate} from "../lib/dist";

export default class RouteDetails extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.handleCalendar=this.handleCalendar.bind(this);
		//alert(props.directions.to.date)
		this.state = {
			buttonVisible: !props.directions.to.date,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.state = {
			buttonVisible: !nextProps.directions.to.date,
		};
	}

	handleCalendar(direct) {
		this.props.getCalendar(direct);
	}

	render() {
		let props = this.props;

		let directions = props.directions;
		let elems = [
			<DateBlock
				text="Туда"
				date={formatDate(directions.from.date)}
				direct="from"
				handleCalendar={this.handleCalendar}
			/>
		];
	    
	    if(this.state.buttonVisible) {
	    	
	    	elems.push(
	    		<ButtonElem direct="to" handleCalendar={this.handleCalendar}/>
	    		//bittonElem({direct: "to", handleCalendar: this.handleCalendar})
	    	);

	    } else {

	    	elems.push(
	    		<DateBlock
					text="Обратно"
					date={formatDate(directions.to.date)}
					direct="to"
					handleCalendar={this.handleCalendar}
				/>
	    	);
	    	
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

function DateBlock(props) {
	//let direction=props.direct;
	let handleClick = ()=>{
		props.handleCalendar(props.direct)
	}
	return(
		<div className="date-block" onClick={handleClick}>
			<span>{props.text}</span>
			<p>{props.date}</p>
		</div>
	);
}

function ButtonElem(props) {
	//let direction=props.direct;
	let handleClick = ()=>{
		props.handleCalendar(props.direct)
	}
	return(
		<button
	    	type="button"
	    	className="add"
	    	onClick={handleClick}
	    >
	    	+ Обратно
	    </button>
	);
}