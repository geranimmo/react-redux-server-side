import {
	USER_LOGIN_FETCH_SUCCESS,
	USER_LOGIN_FETCH_FAILED,
	DISPATCH_BUY_HISTORY
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_LOGIN_FETCH_FAILED:
			return [];
		case USER_LOGIN_FETCH_SUCCESS:
			return [];
		case DISPATCH_BUY_HISTORY:
			return action.payload;
		default:
			return state;
	}
};
