import {
	USER_LOGIN_FETCH,
	USER_LOGIN_FETCH_SUCCESS,
	USER_LOGIN_FETCH_FAILED,
	DISPATCH_PROFILE_DATA,
	DISPATCH_SHOPPING_CART,
	DISPATCH_BUY_HISTORY
} from './types';
import AuthenticationData from '../../assets/json/accounts__.json';

export const loginFetch = (datas) => {
	return (dispatch) => {
		dispatch({ type: USER_LOGIN_FETCH });
		
		const matchData = AuthenticationData.filter((obj) => {
			return obj.email_address === datas.username && obj.user_password === datas.password;
		});

		if (matchData.length > 0) {
			let objData = new Object(matchData[0]);
			loginFetchSuccess(dispatch, objData);
		} else {
			loginFetchFailed(dispatch);
			alert('Something Wrong With Your Username or Password');
		}
	};
};

const loginFetchSuccess = (dispatch, datas) => {
	dispatch({ type: USER_LOGIN_FETCH_SUCCESS });
	
	let profileData = {
		client_id: datas.client_id,
		first_name: datas.first_name,
		last_name: datas.last_name,
		business_name: datas.first_name,
		phone_number: datas.first_name,
		client_logo: datas.client_logo,
		client_special: datas.client_special
	};
	dispatchProfile(dispatch, profileData);

	if (datas.shopping_cart) {
		dispatchCartData(dispatch, datas.shopping_cart);
	}
	
	if (datas.buy_history) {
		dispatchBuyHistory(dispatch, datas.buy_history);
	}
};

const loginFetchFailed = (dispatch) => {
	dispatch({ type: USER_LOGIN_FETCH_FAILED });
};

const dispatchProfile = (dispatch, data) => {
	dispatch({
		type: DISPATCH_PROFILE_DATA,
		payload: data
	});
};

const dispatchCartData = (dispatch, data) => {
	dispatch({
		type: DISPATCH_SHOPPING_CART,
		payload: data
	});
};

const dispatchBuyHistory = (dispatch, data) => {
	dispatch({
		type: DISPATCH_BUY_HISTORY,
		payload: data
	});
};