import axios from 'axios';
import { INITIAL_DATA_REDUCER } from './types';

export const fetchInitialData = props => {
    return (dispatch) => {
        axios.get(`http://localhost:3000/api/getRewardById/${props.id}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: INITIAL_DATA_REDUCER,
                        payload: response.data
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
};

export const setInitialData = props => {
    return (dispatch) => {
        dispatch({
            type: INITIAL_DATA_REDUCER,
            payload: props
        });
    };
};