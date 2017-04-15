import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import rootReducer from '../lib/reducers';
import * as actions from '../lib/actions';
import flags, {statuses} from "../lib/flags";
import {formatDate, date} from "../lib/dist";
import thunk from 'redux-thunk';

import Head from "./Head";
import Navigation from "./Navigation";
import Route from "./Route";
import RouteDetails from "./RouteDetails";
import Tickets from "./Tickets";
import SearchTickets from "./SearchTickets";
import ListCities from "./ListCities";
import Loading from "./Loading";
import Calendar from "./Calendar";
import Flights from "./Flights";

var dateMin = new Date();
var dateMax = new Date(dateMin.getFullYear()+1, dateMin.getMonth(), dateMin.getDate());

var initState = {
	voyage: {
		status: "empty",
		cities: null,
		direction: null,
		from: {
			name: null,
			date: dateMin,
			weather: null,
		},
		to: {
			name: null,
			date: null,
			weather: null,
		},
		//На деле дата должна приходить с сервера, а не определястя у пользователя
		/*fromDate: formatDate(dateMin),//Хранить как есть, парсить в другом месте
		toDate: null,*/

		tickets: {
			adult: 1,
			kind: 0,
			baby: 0,
		},

		minValues: {//Все минимальные значения
			from: {
				date: dateMin,
			},
			to: {
				date: dateMax,
			},
			tickets: {
				adult: 1,
				kind: 0,
				baby: 0,
			},
		},
	},
}

const store = createStore(rootReducer, initState, applyMiddleware(thunk));

class App extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}
	render() {
		let props = this.props;
		let store = props.storeVoyage;

		let directions={
			from: store.from,
			to: store.to,
		};
		
		let cityFrom = store.from.name;
		let cityTo = store.to.name;

		let tickets = store.tickets;
		let elems = [];

		switch(store.status) {
			case statuses.load:
				elems.push(
					<Loading />
				);
				break;
			case statuses.succ:
				elems.push(
					<ListCities
						direction = {store.direction}
						cityFrom = {cityFrom}
						cityTo = {cityTo}
						data = {store.cities}
						setCity = {props.setCity}
						hideListCities={props.hideListCities}
					/>
				);
				break;
			case statuses.gC:
				elems.push(
					<Calendar
						minDate={store.minValues.from.date}
						maxDate={store.minValues.to.date}
						selectMinDate={store.from.date}
						selectMaxDate={store.to.date}
						direction = {store.direction}
						hideCalendar={props.hideCalendar}
						setDate={props.setDate}
					/>
				);
				break;
			case statuses.gW:
	
				elems.push(
					<Flights
						cityFrom={cityFrom}
						cityTo={cityTo}
						weatherFrom={store.from.weather}
						weatherTo={store.to.weather}
						hideWeather={props.hideWeather}
					/>
				);
				break;
		}

    	return (
    		<div className="App">
    		<Head />
    		<Navigation />
			<Route
				directions={directions}
				queryCities={props.queryCities}
				castling={props.castling}
			/>
			<RouteDetails
				directions={directions}
				getCalendar={props.getCalendar}
				removeToDate={props.removeToDate}
			/>
			<Tickets tickets={tickets} minTickets={store.minValues.tickets} setTicket={props.setTicket}/>
			<SearchTickets
				cityFrom={cityFrom}
				cityTo={cityTo}
				getWeather={props.getWeather}/>
			{elems}
      	</div>
    	);
  }
}


function mapStateToProps(state) {
	return {storeVoyage: state.voyage};
}

function mapDispatchToProps(dispatch) {
	return {

		queryCities: (direct)=>{
			dispatch(actions.queryCities(direct));
		},

		setCity: (direct, city)=> {
			dispatch(actions.setCityAction(direct, city));
		},
		hideListCities: ()=>{
			dispatch(actions.hideListCitiesAction());
		},
		castling: ()=>{
			dispatch(actions.castlingAction());
		},
		getCalendar: (direction)=>{
			dispatch(actions.getCalendarAction(direction));
		},
		hideCalendar: ()=>{
			dispatch(actions.hideCalendarAction());
		},
		setDate: (direct, date)=>{
			dispatch(actions.setDateAction(direct, date));
		},
		removeToDate() {
			dispatch(actions.removeToDateAction());
		},
		setTicket: (age, value)=>{
			dispatch(actions.setTicketAction(age, value));
			//tickets
		},
		getWeather: (cityF, cityT)=>{
			dispatch(actions.getWeatherAction(cityF, cityT));
		},
		hideWeather: ()=>{
			dispatch(actions.hideWeatherAction());
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {store};