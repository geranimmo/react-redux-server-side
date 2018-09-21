import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as actions from '../../../src/components/actions';
import * as types from '../../../src/components/actions/types';
import * as reducers from '../../../src/components/reducers';

const createMockStore = configureMockStore([thunk]);

describe('>>> A C T I O N ---- Test Add & Remove Items in Cart Actions <<<', () => {
	const requestPackageId = 'Classic';
	const requestSampleDate = 1537425742947;
	
	it('+++ Action addToCart with auto generated dateTime +++', () => {
		const store = createMockStore(reducers.ShoppingCart);
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
		const store = createMockStore(reducers.ShoppingCart);
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

	it('+++ Action removeFromCart +++', () => {
		const store = createMockStore(reducers.ShoppingCart);
		store.dispatch(actions.removeFromCart({id: requestPackageId, date: requestSampleDate}));
		const dispatchedActions = store.getActions();

		expect(dispatchedActions)
			.toEqual([{
				type: types.REMOVE_FROM_CART,
				payload: {
					id: requestPackageId,
					date: requestSampleDate
				}
			}]);
	});
});