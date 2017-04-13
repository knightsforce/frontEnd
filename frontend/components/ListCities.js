import React, { Component } from 'react';
import flags from "../lib/flags";

export default class ListCities extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		
	}

	render() {
		let props = this.props;
		let counts = props.counts;
		let data = props.data;

		let listCountry = data.results.sort((a,b)=>{
			return a>b;
		})
		.map((item)=>{
			return (
				<ItemList 
					key={item.members}
					direction={props.direction}
					city={item.city}
					setCity={props.setCity}
				/>
			);
		});

	    return (
	      <div className="ListCities" style={props.style}>
	      	<div className="wrap-content">
	      		<div className="wrap-image">
		      		<div className="image"></div>
		      	</div>
			    
			    <div className="wrap-list">
			    	<Search focus={true} />
			    	<div className="text">Туда</div>
			      	<ul>
			      		{listCountry}
			      	</ul>
			    </div>	
	      	</div>
	      </div>
	    );
	}
}

class Search extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	componentDidMount() {
		this.input.focus();
	}

	render() {
		let props = this.props;
		let counts = props.counts; 
	    return (
	      <div className="search-input">
	      	<input
	      		placeholder={props.placeholder || null}
	      		ref={(input)=>{this.input=input}}
	      	/>
	      </div>
	    );
	}
}

class ItemList extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.city=this.props.city;
	}

	handleClick() {
		this.props.setCity(this.props.direction, this.props.city);
	}

	render() {
		let props = this.props;
	    return (
	      <li onClick={this.handleClick}>
	      	{props.city}
	      </li>
	    );
	}
}