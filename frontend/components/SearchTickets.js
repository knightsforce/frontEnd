import React, { Component } from 'react';
import flags from "../lib/flags";

export default class SearchTickets extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.handleClick=this.handleClick.bind(this);
	}
	
	handleClick() {
		let cityF = this.props.cityFrom;
		let cityT = this.props.cityTo;
		/*
			Если хоть один город не выбран,
			ничего не делать
		*/
		if(!(cityF && cityT)) return;
		else {
			this.props.getWeather(cityF, cityT);
		}
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
