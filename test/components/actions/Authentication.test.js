import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../src/components/actions';
import * as types from '../../../src/components/actions/types';
import * as reducers from '../../../src/components/reducers';
import AccountList from '../../../src/assets/json/accounts__.json';

const createMockStore = configureMockStore([thunk]);

describe('>>> A C T I O N ---- Test Authentication Actions <<<', () => {
	const loginData = {
		username: 'client@default.com',
		password: 'default123'
	};
	const matchAccountData = AccountList.filter((obj) => {
		return obj.email_address === loginData.username && obj.user_password === loginData.password;
	});
	const resultAccountData = new Object(matchAccountData[0]);
	
	it('+++ Action loginFetch', () => {
		const store = createMockStore(reducers.UserLogin);
		store.dispatch(actions.loginFetch(loginData));
		const dispatchedActions = store.getActions();

		expect(dispatchedActions).toEqual([{
			type: types.DISPATCH_LOGIN,
			payload: true
		}]);
	});

	it('+++ Action dispatchProfile +++', () => {
		const expectedDatas = {
			client_id: resultAccountData.client_id,
			first_name: resultAccountData.first_name,
			last_name: resultAccountData.last_name,
			business_name: resultAccountData.first_name,
			phone_number: resultAccountData.phone_number,
			client_logo: resultAccountData.client_logo,
			client_special: resultAccountData.client_special
		};
		const store = createMockStore(reducers.Profile);
		store.dispatch(actions.dispatchProfile(loginData));
		const dispatchedActions = store.getActions();

		expect(dispatchedActions).toEqual([{
			type: types.DISPATCH_PROFILE_DATA,
			payload: expectedDatas
		}]);
	});

	it('+++ Action dispatchShoppingCart +++', () => {
		const expectedDatas = resultAccountData.shopping_cart;
		const store = createMockStore(reducers.ShoppingCart);
		store.dispatch(actions.dispatchShoppingCart(loginData));
		const dispatchedActions = store.getActions();

		expect(dispatchedActions).toEqual([{
			type: types.DISPATCH_SHOPPING_CART,
			payload: expectedDatas
		}]);
	});
});