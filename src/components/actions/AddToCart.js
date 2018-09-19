import { ADD_TO_CART } from './types';

export const addToCart = (data) => {
	return (dispatch) => {
		const DateTime = new Date().getTime();
		const datas = [{
			id: data,
			buy_time: DateTime
		}];

		dispatch({
			type: ADD_TO_CART,
			payload: datas
		});
	};
};