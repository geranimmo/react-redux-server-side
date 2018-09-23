import { DISPATCH_TOTAL_DISCOUNT } from '../actions/types';

const INITIAL_STATE = 0;

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case DISPATCH_TOTAL_DISCOUNT:
			return action.payload;
		default:
			return state;
	}
};
