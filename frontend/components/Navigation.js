import React, { Component } from 'react';
import flags from "../lib/flags";

export default class Navigation extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}
	render() {
		let props = this.props;
	    return (
	      <div className="Navigation">
	    	<nav>
	    		<ul>
	    			<li>Мои билеты</li>
	    			<li>Регистрация</li>
	    			<li className="active">Покупка</li>
	    		</ul>
	    	</nav>
	      </div>
	    );
	}
}
