import { TEST_DATA_REDUCER } from '../actions/types';

const __INITIAL_STATE__ = 'Data not sending!';

export default (state = __INITIAL_STATE__, action) => {
    switch (action.type) {
        case TEST_DATA_REDUCER:
            return action.payload;
        default:
            return state;
    }
}