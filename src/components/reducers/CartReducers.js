import {
	USER_LOGIN_FETCH_SUCCESS,
	USER_LOGIN_FETCH_FAILED,
	DISPATCH_SHOPPING_CART,
	ADD_TO_CART
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_LOGIN_FETCH_FAILED:
			return [];
		case USER_LOGIN_FETCH_SUCCESS:
			return [];
		case DISPATCH_SHOPPING_CART:
			return action.payload;
		case ADD_TO_CART:
			return [...state, ...action.payload];
		default:
			return state;
	}
};
