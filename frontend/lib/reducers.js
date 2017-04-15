import { combineReducers } from 'redux';
import flags from "./flags";

/*
	Многие флаги повторяют функционал, в контексте теста - бесмсленно,
	но если добавится определенный функционал к какому-то действию, то не придется переписывать
	в разных файлах, добавляя флаги, а просто здесь вставить еще один case: break.
*/

function voyage(state={}, action) {
	let currentDirection, resultObj;
	switch(action.type) {
		case flags.citiesLoad:
		case flags.citiesSucc:
		case flags.citiesErr:
		case flags.changeDirect:
		case flags.getCalendar:
		case flags.hideCalendar:
		case flags.weatherCompl:
		case flags.hideWeather:
		case flags.hideListCity:
			return Object.assign({}, state, action.payload);
			break;


		case flags.setCity:
			currentDirection = Object.assign(
				{},
				state[action.payload.direction],//from или to
				{name: action.payload.name}
			);
			resultObj = {
				status: action.payload.status,
				cities: action.payload.cities,
			};
			resultObj[action.payload.direction] = currentDirection;

			return Object.assign(
				{},
				state,
				resultObj
			);
			break;


		case flags.setDate:

			currentDirection = Object.assign(
				{},
				state[action.payload.direction],//from или to
				{date: action.payload.date}
			);
			resultObj = {
				status: action.payload.status,
			};
			resultObj[action.payload.direction] = currentDirection;

			return Object.assign(
				{},
				state,
				resultObj
			);
			break;


		case flags.removeToDate:
			let toObj = Object.assign(
				{},
				state.to,
				{date: action.payload}
			);

			return Object.assign(
				{},
				state,
				{to: toObj}
			);
			break;


		case flags.castling:
			let newFrom = Object.assign({}, state.from);
			let newTo = Object.assign({}, state.to);
			let newState=Object.assign({}, state, {from: newFrom, to: newTo});

			[newState.from.name, newState.to.name]=[newState.to.name, newState.from.name];
			return newState;
			break;


		case flags.setTicket:
			let tickets = Object.assign({}, state.tickets);
			tickets[action.payload.age]=action.payload.value;
			
			return Object.assign({}, state, {tickets: tickets});
			break;


		case flags.weatherLoad:
			return Object.assign({}, state, action.payload);
			break;


		case flags.weatherSucc:

			let direct = action.payload.direction;

			let weather = action.payload.weather;

			resultObj = {};
			resultObj[direct]=null;

			let resulDirect = Object.assign(
				{},
				state[direct],
				{weather: weather}
			);
			resultObj[direct]=resulDirect;

			return Object.assign({}, state, resultObj);


		case flags.weatherErr:
			return Object.assign({}, state, action.payload);
			break;


		case flags.weatherCompl:
			return Object.assign({}, state, action.payload);
			break;
	}
	return state;
}

let rootReducer = combineReducers({
	voyage,
});

export default rootReducer;