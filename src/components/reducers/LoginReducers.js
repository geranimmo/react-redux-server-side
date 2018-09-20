import { DISPATCH_LOGIN } from '../actions/types';

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case DISPATCH_LOGIN:
			return action.payload;
		default:
			return state;
	}
};
