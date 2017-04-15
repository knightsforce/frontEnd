import React, { Component } from 'react';
import flags from "../lib/flags";
import {months, shortMonths, getDaysInMonth, isCoincid, parseDate} from "../lib/dist";

let namesDays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.props=props;
    this.handlerDate = this.handlerDate.bind(this);
    this.handlerOk = this.handlerOk.bind(this);
    this.handlerCancel = this.handlerCancel.bind(this);
    
    let selectDate = null;
    
    switch(props.direction) {
      case "from":
        selectDate=props.selectMinDate;
        break;
      case "to":
        selectDate=props.selectMaxDate || props.selectMinDate;
        break;
    }

    this.state = {
      selectDate: selectDate,
    }
  }

  handlerDate(date) {
    this.setState((prevStae)=>{
      return {selectDate: date};
    });
  }

  handlerOk() {
    
    let direction = this.props.direction;
    let date = this.state.selectDate;

    this.props.setDate(direction, date);

    if(direction == "from") {// Если меянется отправная точка
      if (this.props.selectMaxDate && date>this.props.selectMaxDate) {
        /*При этом выбранная дата != null и отправная больше конечной,
        то снова выбирать дату*/
        this.props.setDate("to", null);
      }
    }//
  }

  handlerCancel() {
    this.props.hideCalendar();
  }

  render() {//Внутренняя отрисовка по state
    let props = this.props;

    var year, monthNumber, firstDay, countDays,
    isSelect, isMinMonth, isMaxMonth, dateOpt;
    
    let minDate = (props.direction =="from") ? props.minDate : props.selectMinDate;
    let maxDate = props.maxDate;
    let minDay = minDate.getDate();
    let maxDay = maxDate.getDate();
    let minYear = minDate.getFullYear();
    let maxYear = maxDate.getFullYear();
    let minMonth = minDate.getMonth();
    let maxMonth = maxDate.getMonth();

    let currentDate = new Date(minDate);//Чтобы не менять то что в state
    /*
      На основе минимальной, но будет менятсяь в процессе
    */
    currentDate.setDate(1);

    let selectDate = this.state.selectDate;
    let sYear = selectDate.getFullYear();
    let sMonth = selectDate.getMonth();
    let sDate = selectDate.getDate();
    let sDay = selectDate.getDay() || 7;

    let monthsList = [];
    

    while(currentDate<maxDate) {

      dateOpt = parseDate(currentDate);

      monthNumber = dateOpt.monthNum;     
      year = dateOpt.year;
      firstDay = dateOpt.day;
      countDays = dateOpt.daysInMonth;

      isSelect = isCoincid(sYear, year, sMonth, monthNumber);//Вычисляю сходятся ли даты
      isMaxMonth = isCoincid(maxYear, year, maxMonth, monthNumber);
      isMinMonth = isCoincid(minYear, year, minMonth, monthNumber);
      

      isMinMonth
      isMaxMonth

      monthsList.push(
        <Month
          handlerDate={this.handlerDate}
          countDays={countDays}
          year = {year}
          firstDay={firstDay}
          month={monthNumber}
          monthName={months[monthNumber]}
          selectDay = {(isSelect) ? sDate : null}
          minDay = {(isMinMonth) ? minDay : null}
          maxDay = {(isMaxMonth) ? maxDay : null}
        />
      );

      currentDate.setMonth(monthNumber+1);
    }

    return (
      <div className="Calendar">
        <div className="wrap-content">
          <div className="head">
            <p>
              {sYear}
            </p>
            <p>
              <span>{namesDays[selectDate.getDay()]}, </span>
              <span>{sDate} </span>
              <span>{shortMonths[sMonth]}</span>
            </p>
          </div>
          <div className="month-list">
            {monthsList}
          </div>
          <div className="button-container">
            <button onClick={this.handlerCancel}>Отмена</button>
            <button onClick={this.handlerOk}>Ок</button>
          </div>
        </div>
      </div>
    );
  }
}

class Month extends Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {//Внутренняя отрисовка по state
    let props = this.props;

    let countDays = props.countDays;
    let year = props.year;
    let month = props.month;
    let monthName=props.monthName;
    let firstDay = props.firstDay;

    let ths = [];
    for(let i = 1; i<namesDays.length; i++) {
      ths.push(<th key={i}>{namesDays[i]}</th>);
    }
    ths.push(<th key={0}>{namesDays[0]}</th>);

    let week = [];
    let weeksList = [];
    firstDay = firstDay || 7;
    //Если 1 - то не сработает
    for(let i=1; i<firstDay; i++) {
      week.push(<td key={i+0.5}></td>);
    }    

    if(firstDay!=1) {
      firstDay = firstDay || 7;//Если 0
      
    }
    let minDay = props.minDay;
    let maxDay = props.maxDay;

    let emptyCount=firstDay-1;
    let classNames = "";
    
    let active = null;

    for(let i=1; i<=countDays; i++) {
      active = true;

      if(props.selectDay) {
        (props.selectDay == i) && (classNames+=" select");
      }

      if(minDay) {
          if(props.minDay > i) {
            classNames+=" non-active";
            active=false;
          }

      } else if(maxDay) {
          if(props.maxDay < i) {
            classNames+=" non-active";
            active=false;
          } 
      }
      //Не срабатывает handler на 1
      //проверки - потому что смысл хранить лишнее

      week.push(
        <Day
          className={classNames.trim()}
          key={i}
          handlerDate={(active) ? props.handlerDate : null}
          year={((active) ? year : null)}
          month={((active) ? month : null)}
          date={((active) ? i : null)}
        >
          {i}
        </Day>
      );
      if((i+emptyCount)%7==0 || i==countDays) {
        weeksList.push(<tr>{week}</tr>);
        week=[];
      }
      classNames="";
    }
    week=null;

    return (
      <div className="month">
        <table>
          <caption>{props.monthName}</caption>
          <thead>
            <tr>
              {ths}
            </tr>
          </thead>
          <tbody>
            {weeksList}
          </tbody>
        </table>
      </div>
    );
  }
}

class Day extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.year = props.year;
    this.month = props.month;
    this.date = props.date;

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick() {
    if(this.props.handlerDate) {
      let date = new Date(this.year, this.month, this.date);
      this.props.handlerDate(date);
    }
  }

  render() {//Внутренняя отрисовка по state
    let props = this.props;
    return (
      <td className={props.className} onClick={this.handleClick}>
        {props.children}
      </td>
    );
  }
}