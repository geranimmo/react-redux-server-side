import { REMOVE_FROM_CART } from './types';

export const removeFromCart = (data) => {
	return (dispatch) => {
		dispatch({
			type: REMOVE_FROM_CART,
			payload: data
		});
	};
};