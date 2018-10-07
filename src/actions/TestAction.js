import { TEST_DATA_REDUCER } from './types';

export const testAction = () => {
    return (dispatch) => {
        dispatch({
            type: TEST_DATA_REDUCER,
            payload: "Sending data success."
        });
    }
};