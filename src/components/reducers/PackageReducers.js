import {
	PACKAGES_LIST_FETCH,
	PACKAGES_LIST_FETCH_SUCCESS,
	PACKAGES_LIST_FETCH_FAILED
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PACKAGES_LIST_FETCH:
			return [];
		case PACKAGES_LIST_FETCH_SUCCESS:
			return action.payload;
		case PACKAGES_LIST_FETCH_FAILED:
			return [];
		default:
			return state;
	}
};
