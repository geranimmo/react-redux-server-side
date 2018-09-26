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
	const expectedDataProfile = {
		client_id: resultAccountData.client_id,
		first_name: resultAccountData.first_name,
		last_name: resultAccountData.last_name,
		business_name: resultAccountData.first_name,
		phone_number: resultAccountData.phone_number,
		client_logo: resultAccountData.client_logo,
		client_special: resultAccountData.client_special
	};
	
	it('+++ Action loginFetch if user exist', () => {
		const store = createMockStore(reducers.UserLogin);
		store.dispatch(actions.loginFetch(loginData));
		const dispatchedActions = store.getActions();

		expect(dispatchedActions)
			.toContainEqual(
				expect.objectContaining(
					{
						type: types.DISPATCH_LOGIN,
						payload: true
					}, {
						type: types.DISPATCH_PROFILE_DATA,
						payload: expectedDataProfile
					}, {
						type: types.DISPATCH_SHOPPING_CART,
						payload: resultAccountData.shopping_cart
					}
				)
			);
	});

	it('+++ Action loginFetch if not user exist', () => {
		const store = createMockStore(reducers.UserLogin);
		store.dispatch(actions.loginFetch({
			username: 'client@test.com',
			password: 'test123'
		}));
		const dispatchedActions = store.getActions();

		expect(dispatchedActions)
			.toContainEqual(
				expect.objectContaining(
					{
						type: types.DISPATCH_LOGIN,
						payload: false
					}
				)
			);
	});
});