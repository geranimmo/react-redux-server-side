import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as actions from '../../../src/components/actions';
import * as types from '../../../src/components/actions/types';

describe('>>> A C T I O N ---- Test GetTotalDiscount Actions <<<', () => {
	const mockStore = configureMockStore([thunk]);
	
	it('+++ Total discount - Free for minimum buy +++', () => {
		const sampleData = {
			ShoppingCart: [
				{ id: 'Classic', package_id: "Classic", package_price: 269.99 },
				{ id: 'Classic', package_id: "Classic", package_price: 269.99 },
				{ id: 'Classic', package_id: "Classic", package_price: 269.99 }
			],
			Profile: {
				client_special: [
					{
						types: "free__items",
						package_id: "Classic",
						minimum_items: 3,
						free_items: 1
					}
				]
			}
		};
		const store = mockStore(sampleData);
		store.dispatch(actions.getTotalDiscount());
		const dispatchedActions = store.getActions();
		const expectedDiscount = 269.99;
		
		expect(dispatchedActions).toContainEqual(
			expect.objectContaining({
				type: types.DISPATCH_TOTAL_DISCOUNT,
				payload: expectedDiscount
			})
		);
	});

	it('+++ Total discount - Each price drops with minimum buy +++', () => {
		const sampleData = {
			ShoppingCart: [
				{ id: 'Standout', package_id: "Standout", package_price: 322.99 },
				{ id: 'Standout', package_id: "Standout", package_price: 322.99 },
				{ id: 'Standout', package_id: "Standout", package_price: 322.99 },
				{ id: 'Standout', package_id: "Standout", package_price: 322.99 }
			],
			Profile: {
				client_special: [
					{
						types: "discount__items",
						package_id: "Standout",
						minimum_items: 4,
						discount_price: 15
					}
				]
			}
		};
		const store = mockStore(sampleData);
		store.dispatch(actions.getTotalDiscount());
		const dispatchedActions = store.getActions();
		const expectedDiscount = 60;
		
		expect(dispatchedActions).toContainEqual(
			expect.objectContaining({
				type: types.DISPATCH_TOTAL_DISCOUNT,
				payload: expectedDiscount
			})
		);
	});

	it('+++ Multiple discount - Each price drops with minimum buy +++', () => {
		const sampleData = {
			ShoppingCart: [
				{ id: 'Classic', package_id: "Classic", package_price: 269.99 },
				{ id: 'Classic', package_id: "Classic", package_price: 269.99 },
				{ id: 'Classic', package_id: "Classic", package_price: 269.99 },
				{ id: 'Standout', package_id: "Standout", package_price: 322.99 },
				{ id: 'Standout', package_id: "Standout", package_price: 322.99 }
			],
			Profile: {
				client_special: [
					{
						types: "free__items",
						package_id: "Classic",
						minimum_items: 3,
						free_items: 1
					}, {
						types: "discount__items",
						package_id: "Standout",
						minimum_items: 2,
						discount_price: 15
					}
				]
			}
		};
		const store = mockStore(sampleData);
		store.dispatch(actions.getTotalDiscount());
		const dispatchedActions = store.getActions();
		const expectedDiscount = 299.99;
		
		expect(dispatchedActions).toContainEqual(
			expect.objectContaining({
				type: types.DISPATCH_TOTAL_DISCOUNT,
				payload: expectedDiscount
			})
		);
	});

	it('+++ Should filter Cart list data by client special package id +++', () => {
		const sampleData = {
			target: [
				{
					package_id: "Classic",
					package_name: "Classic",
					package_recommend: false,
					package_price: 269.99
				}, {
					package_id: "Standout",
					package_name: "Standout",
					package_recommend: true,
					package_price: 322.99
				}
			],
			selector: "Classic"
		};
		const expectedData = sampleData.target[0];

		expect(actions.filterPromoById(sampleData.selector, sampleData.target)).toEqual(
			expect.objectContaining([expectedData])
		);
	});
});