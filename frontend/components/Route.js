import React, { Component } from 'react';
import flags from "../lib/flags";

let defaultFrom = "Туда";
let defaultTo = "Оттуда";

export default class Route extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}
	render() {
		let props = this.props;
		let directions = props.directions;
	    return (
	      <div className="Route">
	    	<Path />
	    	<div className="directions">
		    	<Directions
		    		direct="from"
		    		name={directions.from.name || defaultFrom}
		    		queryCities={props.queryCities}
		    	/>
		    	<Directions
		    		direct="to"
		    		name={directions.to.name || defaultTo}
		    		queryCities={props.queryCities}
		    	/>
	    		<Castling castling={props.castling}/>
	    	</div>
	      </div>
	    );
	}
}

class Path extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}
	render() {
		let props = this.props;
	    return (
	    	<div className="path">
	    		<div className="image">
	    			<div></div>
		    		<div></div>
		    		<div><p></p></div>
	    		</div>
	    	</div>
	    );
	}
}
//
class Directions extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		this.props.queryCities(this.props.direct);
	}

	render() {
		let props = this.props;

	    return (
		    <div className="direction" onClick={this.handleClick}>
		    	<h5>{props.name}</h5>
		    	<span>Все аэропорты</span>
		    </div>
	    );
	}
}


class Castling extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.castling();
	}

	render() {
		let props = this.props;
	    return (
	    	<div
	    		className="castling"
	    		onClick={this.handleClick}
	    	>
	    		<span>&#8646;</span>
	    	</div>
	    );
	}
}
