import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as actions from '../../../src/components/actions';
import * as types from '../../../src/components/actions/types';

describe('>>> A C T I O N ---- Test GetTotalCost Actions <<<', () => {
	const mockStore = configureMockStore([thunk]);

	it('+++ Total Cart Cost - Free for minimum buy +++', () => {
		// Total cost is the price accumulation of all cart lists without reduction of discount or special clients
		const sampleData = {
			ShoppingCart: [
				{ id: 'Classic', package_id: "Classic", package_price: 269.99 },
				{ id: 'Classic', package_id: "Classic", package_price: 269.99 },
				{ id: 'Classic', package_id: "Classic", package_price: 269.99 }
			]
		};
		const store = mockStore(sampleData);
		store.dispatch(actions.getTotalCost());
		const dispatchedActions = store.getActions();
		const expectedCost = 809.97;
		
		expect(dispatchedActions).toContainEqual(
			expect.objectContaining({
				type: types.DISPATCH_TOTAL_COST,
				payload: expectedCost
			})
		);
	});
});