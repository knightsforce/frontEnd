let mounts = [
	"Январь", "Февраль", "Март",	"Апрель",
	"Май", "Июнь", "Июль",	"Август",
	"Сентябрь",	"Октябрь", "Ноябрь", "Декабрь",
];
let postfix = "я";

function formatDate(date, f) {
	date = date || new Date();

	let fullYear = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();



	if(f) {//На будущее

	} else {
		let monthName = mounts[date.getMonth()];
		return (`${day} ${monthName.slice(0, monthName.length-2)+postfix} ${fullYear}`).toLowerCase();
	}
	
}

export {formatDate};