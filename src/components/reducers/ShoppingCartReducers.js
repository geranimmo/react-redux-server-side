import {
	DISPATCH_SHOPPING_CART,
	ADD_TO_CART,
	REMOVE_FROM_CART
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case DISPATCH_SHOPPING_CART:
			return action.payload;
		case ADD_TO_CART:
			return [...state, ...action.payload];
		case REMOVE_FROM_CART:
			return state.filter(e => e.buy_time !== action.payload);
		default:
			return state;
	}
};
