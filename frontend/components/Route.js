import React, { Component } from 'react';
import flags from "../lib/flags";

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
	    	<Directions directions={directions}>
	    		<Castling />
	    	</Directions>

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

class Directions extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.clickFrom = this.clickFrom.bind(this);
		this.clickTo = this.clickTo.bind(this);
	}
	
	clickFrom() {

	}
	clickTo() {
		
	}

	render() {
		let props = this.props;
		let directions = props.directions;

	    return (
	    	<div className="directions">
		    	<div className="direction" onClick={this.clickFrom}>
		    		<h5>{directions.from.name}</h5>
		    		<span>Все аэропорты</span>
		    	</div>
		    	<div className="direction" onClick={this.clickTo}>
		    		<h5>{directions.to.name}</h5>
		    		<span>Все аэропорты</span>
		    	</div>
		    	{props.children}
	    	</div>
	    );
	}
}


class Castling extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}
	render() {
		let props = this.props;
	    return (
	    	<div className="castling">
	    		<span>&#8646;</span>
	    	</div>
	    );
	}
}
