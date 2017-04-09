import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import rootReducer from '../lib/reducers';
import * as actions from '../lib/actions';
import flags from "../lib/flags";
import thunk from 'redux-thunk';

let initState = {
	albums: {
		status: "empty",
		list: {},
	},
}
/*
Структура state:

albums: {
	status: "empty",
	list: {
		id: id,
		title: title:
		artist: artist
	},
},
*/


const store = createStore(rootReducer, initState, applyMiddleware(thunk));

class App extends Component {

  render() {
	let props = this.props;
    return (
      <div className="App">
    	
      </div>
    );
  }
}



function mapStateToProps(state) {
	return {store: state};
}

function mapDispatchToProps(dispatch) {
	return {
		
	};
}

//----------------------------------

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {store};