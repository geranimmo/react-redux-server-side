import ShoppingCartReducer from '../../../src/components/reducers/ShoppingCartReducers';
import {
	DISPATCH_SHOPPING_CART,
	ADD_TO_CART,
	REMOVE_FROM_CART
} from '../../../src/components/actions/types';

describe('>>> R E D U C E R S ---- Test ShoppingCartReducers <<<', () => {
	const sampleDatas = [
		{ id: 'Default', buy_time: 1537425742947 },
		{ id: 'Premium', buy_time: 1537425742948 }
	];
	const newDatas = { id: 'Standout', buy_time: 1537425742957 };

	it('+++ Reducer DISPATCH_SHOPPING_CART should be return what is requested +++', () => {
		expect(
			ShoppingCartReducer([], {
				type: DISPATCH_SHOPPING_CART,
				payload: sampleDatas
			}))
			.toEqual(sampleDatas);
	});
    
	it('+++ Reducer ADD_TO_CART should be added the new item +++', () => {
		const expectedDatas = [...sampleDatas, ...newDatas];

		expect(
			ShoppingCartReducer(sampleDatas, {
				type: ADD_TO_CART,
				payload: newDatas
			}))
			.toEqual(expectedDatas);
	});
    
	it('+++ Reducer REMOVE_FROM_CART should be removed the requested item +++', () => {
		const removedId = 1537425742947;
		const expectedDatas = sampleDatas.filter(e => e.buy_time !== removedId);

		expect(
			ShoppingCartReducer(sampleDatas, {
				type: REMOVE_FROM_CART,
				payload: removedId
			}))
			.toEqual(expectedDatas);
	});
});