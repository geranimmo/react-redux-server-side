import { DISPATCH_TOTAL_COST } from './types';

export const getTotalCost = () => {
	return (dispatch, getState) => {
		const { ShoppingCart } = getState();
		let totalCost = 0;
	
		if ( ShoppingCart.length > 0 ) {
			for ( let i = 0; i < ShoppingCart.length; i++ ) {
				totalCost = parseFloat((totalCost + ShoppingCart[i].package_price).toFixed(2));
			}
		}
        
		dispatch({
			type: DISPATCH_TOTAL_COST,
			payload: totalCost
		});
	};
};