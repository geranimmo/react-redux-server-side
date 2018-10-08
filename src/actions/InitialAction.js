import { INITIAL_DATA_REDUCER } from './types';
require('es6-promise').polyfill();
require('isomorphic-fetch');

export const SetInitialData = (data) => {
    return (dispatch) => {
        dispatch({
            type: INITIAL_DATA_REDUCER,
            payload: data
        });
    };
};

export const fetchInitialData = props => {
    return (dispatch) => {
        fetch(`/api/getRewardById/${props.id}`)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error('Oops, better luck next time!');
                }
                return response.json();
            })
            .then(data => {
                dispatch({
                    type: INITIAL_DATA_REDUCER,
                    payload: data
                });
            });
    }
};