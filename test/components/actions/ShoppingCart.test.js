import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as actions from '../../../src/components/actions';
import * as types from '../../../src/components/actions/types';

describe('>>> A C T I O N ---- Test Add & Remove Items in Cart Actions <<<', () => {
	const mockStore = configureMockStore([thunk]);
	const requestPackageId = 'Classic';
	const requestSampleDate = 1537425742947;
	let store;

	const propCart = {
		ShoppingCart: [],
		Profile: {
			client_id: 1,
			first_name: "Default",
			last_name: "Client",
			business_name: "Default",
			phone_number: "+612529291002",
			client_logo: "client-default-logo.png",
			client_special: []
		}
	};

	beforeEach(() => {
		store = mockStore(propCart);
	});
	
	it('+++ Action addToCart with auto generated dateTime +++', () => {
		store.dispatch(actions.addToCart({id: requestPackageId}));
		const dispatchedActions = store.getActions();

		expect(dispatchedActions).toContainEqual(
			expect.objectContaining({
				type: types.ADD_TO_CART,
				payload: {
					id: requestPackageId,
					buy_time: expect.anything()
				}
			})
		);
	});

	it('+++ Action addToCart with given dateTime +++', () => {
		store.dispatch(actions.addToCart({id: requestPackageId, date: requestSampleDate}));
		const dispatchedActions = store.getActions();

		expect(dispatchedActions).toContainEqual(
			expect.objectContaining({
				type: types.ADD_TO_CART,
				payload: {
					id: requestPackageId,
					buy_time: requestSampleDate
				}
			})
		);
	});

	it('+++ Action removeFromCart and should update Total Cost & Discount +++', () => {
		store.dispatch(actions.removeFromCart(requestSampleDate));
		const dispatchedActions = store.getActions();

		expect(dispatchedActions)
			.toContainEqual(
				expect.objectContaining(
					{
						type: types.REMOVE_FROM_CART,
						payload: requestSampleDate
					}, {
						type: types.DISPATCH_TOTAL_COST,
						payload: expect.anything()
					}, {
						type: types.DISPATCH_TOTAL_DISCOUNT,
						payload: expect.anything()
					}
				)
			);
	});
});