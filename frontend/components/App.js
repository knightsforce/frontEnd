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
			
		},
		to: {
			name: null,
			date: null,
		},
		minDate: dateMin,
		maxDate: dateMax,
		//На деле дата должна приходить с сервера, а не определястя у пользователя
		/*fromDate: formatDate(dateMin),//Хранить как есть, парсить в другом месте
		toDate: null,*/

		tickets: {
			adult: 1,
			kind: 0,
			baby: 0,
		}
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
						data = {store.cities}
						setCity = {props.setCity}
					/>
				);
				break;
			case statuses.gC:
				elems.push(
					<Calendar
						minDate={store.minDate}
						maxDate={store.maxDate}
						selectMinDate={store.from.date}
						selectMaxDate={store.to.date}
						direction = {store.direction}
						hideCalendar={props.hideCalendar}
						setDate={props.setDate}
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
			/>
			<Tickets tickets={tickets} />
			<SearchTickets />
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
	};
}

//----------------------------------

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {store};