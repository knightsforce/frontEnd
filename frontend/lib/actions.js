import flags, {statuses} from "./flags";
import {citiesURL, weatherURL} from "./dist"

function queryCities(direction) {

	return (dispatch)=>{
		
		dispatch(changeDirection(direction));

		$.ajax(citiesURL(), {
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
				alert("Ошибка, повторите снова");
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

function setTicketAction(age, value) {

	return {
		type: flags.setTicket,
		payload: {
			age: age,
			value: value,
		},
	}
}

export {setTicketAction};

function getWeatherAction(city1, city2) {

	return (dispatch) => {

		dispatch(weatherLoadAction());

		function request(city, direct) {

			return new Promise((res, rej)=>{

				$.ajax(weatherURL(city), {
					crossDomain: true,
					dataType: "jsonp",
					cache: false,
					success: (data)=>{
						//Просто добавляю данные
						dispatch(weatherSuccAction(direct, data));
						res();
					},
					error: (err)=>{
						rej(err);
					},
				});

			});
		}

		request(city1, "from").then(()=>{
			return request(city2, "to");
			/*
				Вызываю запрос черезпромис для 1 города,
				если успешно, повторить запрос для 2 города
				Если ошибка хоть в 1 запросе - не отрисовывать погоду
			*/ 
		})
		.then(()=>{
			dispatch(weatherCompliteAction());
		})
		.catch((err)=>{
			alert("Ошибка, повторите снова");
			console.log(err);
			dispatch(weatherErrorAction());
		});
	}
}

export {getWeatherAction};

function weatherLoadAction() {
	return {
		type: flags.weatherLoad,
		payload: {
			status: statuses.load,
		}
	}
}
function weatherSuccAction(direct, data) {
	return {
		type: flags.weatherSucc,
		payload: {
			direction: direct,
			weather: data,
		}
	}
}
function weatherErrorAction() {
	return {
		type: flags.weatherErr,
		payload: {
			status: statuses.err,
		}
	}
}

function weatherCompliteAction(data) {
	return {
		type: flags.weatherCompl,
		payload: {
			status: statuses.gW,
			//cities: null,
		}
	}
}

function hideWeatherAction() {
	return {
		type: flags.hideWeather,
		payload: {
			status: statuses.empty,
		}
	}
}

export {hideWeatherAction};

function removeToDateAction() {
	return {
		type: flags.removeToDate,
		payload: null,
	}
}

export {removeToDateAction};

function hideListCitiesAction() {
	return {
		type: flags.hideListCity,
		payload: {
			status: statuses.empty,
		},
	}
}

export {hideListCitiesAction};