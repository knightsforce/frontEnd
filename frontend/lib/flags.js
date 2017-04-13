const flags = {
	citiesLoad: "CTITIES_LOAD",
	citiesSucc: "CTITIES_SUCCESS",
	//citiesComp: "CTITIES_COMPLETE",
	citiesErr: "CTITIES_ERROR",//Перерендерить города
	changeDirect: "CHANGE_DIRECTION",
	setCity: "SET_CITY",
	getCalendar: "GET_CALENDAR",
	hideCalendar: "HIDE_CALENDAR",
	setDate: "SET_DATE",
	castling: "CASTLING_DIRECTIONS",
}

let statuses = {
	load: "loading",
	succ: "success",
	err: "error",
	empty: "empty",
	gC: "getCalendar",
}
export {statuses};
export default flags;