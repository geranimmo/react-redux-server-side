import {
	USER_LOGIN_FETCH_SUCCESS,
	USER_LOGIN_FETCH_FAILED,
	DISPATCH_PROFILE_DATA
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_LOGIN_FETCH_FAILED:
			return [];
		case USER_LOGIN_FETCH_SUCCESS:
			return [];
		case DISPATCH_PROFILE_DATA:
			return action.payload;
		default:
			return state;
	}
};
