import React, { Component } from 'react';
import flags from "../lib/flags";
import {objW} from "../lib/dist";
console.log("-----", objW);

export default class Flights extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			direction: "from"
		}
	}

	render() {
		
		let props = this.props;
		
		let cityFrom = "Город1";//props.cityFrom;
		let cityTo = "Город2";//props.cityTo;
		let weatherFrom = objW.list;//props.weatherFrom;
		let weatherTo = {}//props.weatherTo;
		
		let cuttentWeather=null;
		switch(this.state.direction) {
			case "from":
				cuttentWeather=weatherFrom;
				break;
			case "to":
				cuttentWeather=weatherTo;
				break;
		}
		/*
			ul - час
			div - день
		*/
		let hours = [];
		let days = [];
		let fields = null;

		let currentDate, elem;
		let prevDate=["a"];//Чтобы false т.к. буква больше числа 

		cuttentWeather.forEach((item, i)=>{
			currentDate=item.dt_txt.split(" ");//[2017-02-16, 12:00:00]
			if(currentDate[0]>prevDate[0]) {
				days.push(
					<div className="day">
						<p>{currentDate[0]}</p>
						{hours}
					</div>
				);
				hours=[];
			}
			//main
			//weather
			//wind
			fields=[
				<li>
					<span>{item.weather[0].description}</span>
				</li>,
				<li>
					<span>Облачность: </span>
					<span>{`${item.clouds.all} %`}</span>
				</li>,
				<li>
					<span>Температура: </span>
					<span>{item.main.temp}</span>
				</li>,
				<li>
					<span>Давление: </span>
					<span>{item.main.pressure}</span>
				</li>,
				<li>
					<span>Влажность: </span>
					<span>{`${item.main.humidity} %`}</span>
				</li>,
				<li>
					<span>Скорость ветра: </span>
					<span>{`${item.wind.speed} м/с`}</span>
				</li>,
			];
			if(item.snow) {
				fields.push(
					<li>
						<span>Объем снега за 3 часа: </span>
						<span>{`${item.snow["3h"]}`}</span>
					</li>,
				);
			}
				
			hours.push(
				<ul className="hours">
					<p>{currentDate[1]}</p>
					{fields}
				</ul>
			);
			
			prevDate=currentDate;
		});
		/*for(let key in cuttentWeather) {

		}*/

	    return (
	      <div className="Flights">
	      	<div className="wrap-content">
	      		<div className="head">
	      			<div className="back"/>
	      			<div className="text">
	      				<p>{cityFrom}</p>
	      				<div className="image"></div>
	      				<p>{cityTo}</p>
	      			</div>
	      		</div>
	      		<div className="prompt">
	      			Шаг 7 из 7. Проверьте данные
	      		</div>
	      		<div className="directions">
	      			<div>
	      				<div className="image"/>
	      				<span>Туда</span>
	      			</div>
	      			<div>
	      				<div className="image"/>
	      				<span>Обратно</span>
	      			</div>
	      		</div>
	      		<div className="weather-block">
	      			<ul>
	      				{days}
	      			</ul>
	      		</div>
	      		
	      	</div>	    	
	      </div>
	    );
	}
}