import TotalDiscountReducer from '../../../src/components/reducers/TotalDiscountReducers';
import { DISPATCH_TOTAL_DISCOUNT } from '../../../src/components/actions/types';

describe('>>> R E D U C E R S ---- Test TotalDiscountReducers <<<', () => {
	it('+++ Reducer DISPATCH_TOTAL_DISCOUNT should be return what is requested +++', () => {
		const expectedData = 300;
		
		expect(
			TotalDiscountReducer([], {
				type: DISPATCH_TOTAL_DISCOUNT,
				payload: expectedData
			}))
			.toEqual(expectedData);
	});
});