import { combineReducers } from 'redux';
import flags from "./flags";

/*
const flags = {
	albums: {
		getInit: "GET_INIT",
		//getComplete: "GET_COMPLETE",
		getSucc: "GET_SUCCESSFUL",
		getErr: "GET_ERROR",

		create: "CREATE_ALBUM",
		createSucc: "CREATED_ALBUM",
		createErr: "CREATED_ERROR",

		save: "SAVE_ALBUM",
		saveSucc: "SAVE_ALBUM_COMPLITE",
		saveErr: "SAVE_ALBUM_ERROR",
	}
};
*/

function albums(state={}, action) {

}

let rootReducer = combineReducers({
	albums,
});

export default rootReducer;