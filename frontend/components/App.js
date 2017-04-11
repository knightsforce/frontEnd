import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import rootReducer from '../lib/reducers';
import * as actions from '../lib/actions';
import flags from "../lib/flags";
import {formatDate} from "../lib/dist";
import thunk from 'redux-thunk';

import Head from "./Head";
import Navigation from "./Navigation";
import Route from "./Route";
import RouteDetails from "./RouteDetails";
import Tickets from "./Tickets";
import SearchTickets from "./SearchTickets";

let initState = {
	voyage: {
		status: "empty",
		settings: {
			from: {
				name: "Откуда",
				date: formatDate(),//Туда - new Date()
				countTickets: {
					adult: 1,
					kind: 0,
					baby: 0,
				}
			},
			to: {
				name: "Куда",
				date: null,//Кнопка
				countTickets: {
					adult: 1,
					kind: 0,
					baby: 0,
				}
			},
/*			tickets: {
				baby: {},
				Children: {},
				adult: {},
			}*/
		}
	},
}
/*
Структура state:

albums: {
	status: "empty",
	list: {
		id: id,
		title: title:
		artist: artist
	},
},
*/


const store = createStore(rootReducer, initState, applyMiddleware(thunk));

class App extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}
	render() {
		let props = this.props;
		let store = props.storeVoyage;
		let settings = store.settings;
		let directions={
			from: settings.from,
			to: settings.to
		};
		let counts = {
			from: settings.from.countTickets,
			to: settings.to.countTickets
		}
    	return (
    		<div className="App">
    		<Head />
    		<Navigation />
			<Route directions={directions}/>
			<RouteDetails directions={directions}/>
			<Tickets counts={counts} />
			<SearchTickets />
      	</div>
    	);
  }
}



function mapStateToProps(state) {
	return {storeVoyage: state.voyage};
}

function mapDispatchToProps(dispatch) {
	return {
		
	};
}

//----------------------------------

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {store};