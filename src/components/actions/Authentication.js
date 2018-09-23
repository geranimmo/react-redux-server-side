import {
	DISPATCH_LOGIN,
	DISPATCH_PROFILE_DATA,
	DISPATCH_SHOPPING_CART
} from './types';
import AccountList from '../../../src/assets/json/accounts__.json';

export const loginFetch = (datas) => {
	return (dispatch) => {
		const matchAccountData = AccountList.filter((obj) => {
			return obj.email_address === datas.username && obj.user_password === datas.password;
		});
		const newData = new Object(matchAccountData[0]);
		const profileData = {
			client_id: newData.client_id,
			first_name: newData.first_name,
			last_name: newData.last_name,
			business_name: newData.first_name,
			phone_number: newData.phone_number,
			client_logo: newData.client_logo,
			client_special: newData.client_special
		};
		
		dispatch({
			type: DISPATCH_LOGIN,
			payload: matchAccountData.length > 0
		});
		dispatch(dispatchProfile(profileData));
		dispatch(dispatchShoppingCart(newData.shopping_cart));
	};
};

export const dispatchProfile = (datas) => {
	return (dispatch) => {
		dispatch({
			type: DISPATCH_PROFILE_DATA,
			payload: datas
		});
	};
};

export const dispatchShoppingCart = (datas) => {
	return (dispatch) => {
		dispatch({
			type: DISPATCH_SHOPPING_CART,
			payload: datas
		});
	};
};