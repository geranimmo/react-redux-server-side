import { DISPATCH_TESTIMONIAL_LIST } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case DISPATCH_TESTIMONIAL_LIST:
			return action.payload;
		default:
			return state;
	}
};
