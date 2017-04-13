import flags, {statuses} from "./flags";
import {createURL} from "./dist"

function queryCities(direction) {

	return (dispatch)=>{
		
		dispatch(changeDirection(direction));

		$.ajax(createURL(), {
			crossDomain: true,
			beforeSend: ()=>{
				dispatch(citiesLoadAction(flags.citiesLoad));
			},//отрисовка загрузки
			complete: (data)=>{
				//dispatch(flags.albums.getComplete);
				

			},//Убрать отрисовку загрузки
			success: (data)=>{
				dispatch(citiesSuccAction(flags.citiesSucc, data));
			},//Пробросить данные
			error: ()=>{
				dispatch(citiesErrorAction(flags.citiesErr));
			},//выдать ошибку
			dataType: "jsonp",
			cache: false,
		});
		/*
			Промисы использовать не стал, т.к. и без них контролируется процесс
		*/
	}
}

export {queryCities};

function citiesLoadAction(flag) {
	return {
		type: flag,
		payload: {
			status: statuses.load,
			cities: null,
		}
	}
}

/*function citiesCompleteAction(flag) {
	return {
		type: flag,
		payload: {
			status: statuses.comp,
			cities: null,
		},
	}
}*/

function citiesSuccAction(flag, data) {
	return {
		type: flag,
		payload: {
			status: statuses.succ,
			cities: data,
		}
	}
}

function citiesErrorAction(flag, data) {
	return {
		type: flag,
		payload: {
			status: statuses.err,
			cities: null,
		}
	}
}

function changeDirection(direction) {
	return {
		type: flags.changeDirect,
		payload: {
			direction: direction,
		}
	}
}

function setCityAction(direction, city) {
	let payload = {
		status: "empty",
		cities: null,
		direction: direction,
		name: city,
	};

	return {
		type: flags.setCity,
		payload: payload,
	}
}

export {setCityAction};

function getCalendarAction(direction) {
	return {
		type: flags.getCalendar,
		payload: {
			status: statuses.gC,
			direction: direction,
		}
	}
}

export {getCalendarAction};

function hideCalendarAction() {
	return {
		type: flags.hideCalendar,
		payload: {
			status: statuses.empty,
			direction: null,
		}
	}
}

export {hideCalendarAction};

function setDateAction(direction, date) {
	
	let payload = {
		status: "empty",
		direction: direction,
		date: date,
	};

	return {
		type: flags.setDate,
		payload: payload,
	}
}

export {setDateAction};

function castlingAction() {
	return {
		type: flags.castling,
	}
}

export {castlingAction};