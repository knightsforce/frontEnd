const flags = {
	citiesLoad: "CTITIES_LOAD",
	citiesSucc: "CTITIES_SUCCESS",
	citiesErr: "CTITIES_ERROR",

	changeDirect: "CHANGE_DIRECTION",
	
	setCity: "SET_CITY",
	
	getCalendar: "GET_CALENDAR",
	hideCalendar: "HIDE_CALENDAR",
	
	setDate: "SET_DATE",
	
	castling: "CASTLING_DIRECTIONS",
	
	setTicket: "SET_TICKET",
	
	weatherLoad: "WEATHER_LOAD",
	weatherSucc: "WEATHER_SUCCESS",
	weatherErr: "WEATHER_ERROR",
}

let statuses = {
	load: "loading",
	succ: "success",
	err: "error",
	empty: "empty",
	gC: "getCalendar",
	sF: "searchWeather",
}
export {statuses};
export default flags;