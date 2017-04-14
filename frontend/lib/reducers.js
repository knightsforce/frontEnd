import { combineReducers } from 'redux';
import flags from "./flags";

/*
let flags = {
	citiesLoad: "CTITIES_LOAD",
	citiesSucc: "CTITIES_SUCCESS",
	citiesComp: "CTITIES_COMPLETE",
	//citiesError: "CTITIES_ERROR"//Перерендерить города
}
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
	}
	return state;
}

let rootReducer = combineReducers({
	voyage,
});

export default rootReducer;