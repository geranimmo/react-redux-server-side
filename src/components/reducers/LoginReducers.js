import {
	USER_LOGIN_FETCH_SUCCESS,
	USER_LOGIN_FETCH_FAILED
} from '../actions/types';

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_LOGIN_FETCH_FAILED:
			return false;
		case USER_LOGIN_FETCH_SUCCESS:
			return true;
		default:
			return state;
	}
};
