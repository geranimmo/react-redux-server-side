import { REMOVE_FROM_CART } from './types';
import { getTotalCost } from './GetTotalCost';
import { getTotalDiscount } from './GetTotalDiscount';

export const removeFromCart = (datas) => {
	return (dispatch) => {
		dispatch({
			type: REMOVE_FROM_CART,
			payload: datas
		});
		dispatch(getTotalDiscount());
		dispatch(getTotalCost());
	};
};