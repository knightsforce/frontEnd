import React, { Component } from 'react';
import flags from "../lib/flags";

export default class ListCities extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.handleCloseClick = this.handleCloseClick.bind(this);
		this.checkCity = this.checkCity.bind(this);

		switch(this.props.direction) {
			case "from":
				this.secondCity = this.props.cityTo;
				break;
			case "to":
				this.secondCity = this.props.cityFrom;
				break;
		}
	}

	handleCloseClick() {
		this.props.hideListCities();
	}

	checkCity(city) {
		return (this.secondCity == city);
	}

	render() {
		let props = this.props;
		let counts = props.counts;
		let data = props.data;

		let point = (props.direction=="to") ? (<p></p>) : null;

		let listCountry = data.results.sort((a,b)=>{
			return a>b;
		})
		.map((item)=>{
			let className = ((this.secondCity==item.city) ? "select" : null);
			return (
				<ItemList 
					key={item.members}
					direction={props.direction}
					city={item.city}
					setCity={props.setCity}
					checkCity={this.checkCity}
					className={className}
				/>
			);
		});

	    return (
	      <div className="ListCities" style={props.style}>
	      	<div className="close" onClick={this.handleCloseClick}>+</div>
	      	<div className="wrap-content">
	      		<div className="wrap-image">
		      		<div className="image">{point}</div>
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

		if(this.props.checkCity(this.props.city)) {
			return;
		}
		this.props.setCity(this.props.direction, this.props.city);
	}

	render() {
		let props = this.props;
	    return (
	      <li className={props.className} onClick={this.handleClick}>
	      	{props.city}
	      </li>
	    );
	}
}