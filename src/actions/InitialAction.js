import { INITIAL_DATA_REDUCER } from './types';

export const SetInitialData = props => {
    return (dispatch) => {
        dispatch({
            type: INITIAL_DATA_REDUCER,
            payload: props
        });
    };
};