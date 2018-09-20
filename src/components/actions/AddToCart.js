import { ADD_TO_CART } from './types';

export const addToCart = (datas) => {
	return (dispatch) => {
		let DateTime = new Date().getTime();
		if ( datas.date ) {
			DateTime = datas.date;
		}

		const requestedDatas = {
			id: datas.id,
			buy_time: DateTime
		};
		
		dispatch({
			type: ADD_TO_CART,
			payload: requestedDatas
		});
	};
};