import { INITIAL_DATA_REDUCER } from '../actions/types';

const __INITIAL_STATE__ = null;

export default (state = __INITIAL_STATE__, action) => {
    switch (action.type) {
        case INITIAL_DATA_REDUCER:
            return action.payload;
        default:
            return state;
    }
};