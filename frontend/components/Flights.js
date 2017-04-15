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
				<tr>
					<td>{item.weather[0].description}</td>
				</tr>,
				<tr>
					<td>Облачность: </td>
					<td>{`${item.clouds.all} %`}</td>
				</tr>,
				<tr>
					<td>Температура: </td>
					<td>{item.main.temp}</td>
				</tr>,
				<tr>
					<td>Давление: </td>
					<td>{item.main.pressure}</td>
				</tr>,
				<tr>
					<td>Влажность: </td>
					<td>{`${item.main.humidity} %`}</td>
				</tr>,
				<tr>
					<td>Скорость ветра: </td>
					<td>{`${item.wind.speed} м/с`}</td>
				</tr>,
			];
			if(item.snow) {
				fields.push(
					<tr>
						<td>Объем снега за 3 часа: </td>
						<td>{`${item.snow["3h"]}`}</td>
					</tr>,
				);
			}
				
			hours.push(
				<table className="hours">
					<caption>{currentDate[1]}</caption>
					<tbody>
						{fields}
					</tbody>
				</table>
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