const apiKey = "56a1510587c66f12617a4b223517d";



let months = [
	"Январь", "Февраль", "Март",	"Апрель",
	"Май", "Июнь", "Июль",	"Август",
	"Сентябрь",	"Октябрь", "Ноябрь", "Декабрь",
];

let shortMonths = [
	"Янв", "Фев", "Март",	"Апр",
	"Май", "Июн", "Июл",	"Авг",
	"Сен",	"Окт", "Нояб", "Дек",
];

export {months, shortMonths};

let postfix = "я";

function formatDate(date, f) {
	date = date || new Date();

	let fullYear = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();



	if(f) {//На будущее

	} else {
		let monthName = months[date.getMonth()];
		return (`${day} ${monthName.slice(0, monthName.length-2)+postfix} ${fullYear}`).toLowerCase();
	}
	
}

export {formatDate};

function createURL(text) {
	return `https://api.meetup.com/cities.json/?country&key=${apiKey}&sign=true`;
}

export {createURL};

////$.ajax("https://api.meetup.com/cities.json/?country&key=56a1510587c66f12617a4b223517d&sign=true", {dataType: "jsonp", success: (data)=>{console.log(data)}})

function parseDate(date) {
	return {
		year: date.getFullYear(),
		monthNum: date.getMonth(),
		day: date.getDay(),
		daysInMonth: getDaysInMonth(date.getFullYear(), date.getMonth()),
	}
}

export {parseDate};

function getDaysInMonth(year, month) {
	return 33 - new Date(year, month, 33).getDate();
}

export {getDaysInMonth};

function isCoincid(year1, year2, month1, month2) {//Coincidence
	return (year1 == year2 && month1 == month2);
}

export {isCoincid};