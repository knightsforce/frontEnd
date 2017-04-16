import React, { Component } from 'react';
import flags from "../lib/flags";

export default class ListCities extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.handleCloseClick = this.handleCloseClick.bind(this);
		this.checkCity = this.checkCity.bind(this);
		this.sorting = this.sorting.bind(this);

		this.state = {
    		sortStr: "",
    	};

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

	sorting(value) {
		this.setState({sortStr: value.toLowerCase()});
	}

	checkCity(city) {
		return (this.secondCity == city);
	}

	render() {
		let props = this.props;
		let counts = props.counts;
		let data = props.data;

		let point = null;
		let text = "Туда"

		if(props.direction=="to") {
			point = (<p></p>);
			text = "Обратно";
		}

		let listCountry = data.results;
		listCountry = listCountry.sort((a,b)=>{
			if(a.city.toLowerCase()>b.city.toLowerCase()) return 1;
			else return -1;
		});
		
		if(this.state.sortStr.length) {
		//Если длины нет, то естьa пустое поле (пустая строка), то и фильтровать не нужно
			listCountry=listCountry.filter((item)=>{
				if(item.city.toLowerCase().indexOf(this.state.sortStr) == 0) {
					return true;
				} else {
					false;
				}
			});
		}

		
		listCountry = listCountry.map((item)=>{
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
			    	<Search focus={true} sorting={this.sorting} />
			    	<div className="text">{text}</div>
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
		this.handleInput = this.handleInput.bind(this);
    	this.handlePress = this.handlePress.bind(this);
    	this.defaultPlaceHolder = "Введте название";
	}

	componentDidMount() {
		this.input.focus();
	}

	clearTimer() {
		this.timer && clearTimeout(this.timer);
	}

	handleInput(e) {
    	this.value = e.target.value.trim();
    	this.clearTimer();
    	this.timer = setTimeout(()=>{
    		this.props.sorting(this.value);
    	}, 1000);//Искать автоматически через секунду после ввода
    	
	}

	handlePress(e) {
    	if(e.key=="Enter") {
    		this.clearTimer();
    		this.props.sorting(this.value);
    	}
  	}

	render() {
		let props = this.props;
		let counts = props.counts; 
	    return (
	      <div className="search-input">
	      	<input
	      		onInput={this.handleInput}
	            onKeyPress={this.handlePress}
	      		placeholder={props.placeholder || this.defaultPlaceHolder}
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
