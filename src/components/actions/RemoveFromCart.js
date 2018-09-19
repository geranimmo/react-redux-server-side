import { DISPATCH_SHOPPING_CART } from './types';

export const removeFromCart = (data) => {
	return (dispatch, getState) => {
		const { ShoppingCart } = getState();
		const updatedDatas = ShoppingCart.filter(e => e.buy_time !== data);
        
		dispatch({
			type: DISPATCH_SHOPPING_CART,
			payload: updatedDatas
		});
	};
};