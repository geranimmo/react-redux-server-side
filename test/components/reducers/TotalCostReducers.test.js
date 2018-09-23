import TotalCostReducer from '../../../src/components/reducers/TotalCostReducers';
import { DISPATCH_TOTAL_COST } from '../../../src/components/actions/types';

describe('>>> R E D U C E R S ---- Test TotalCostReducers <<<', () => {
	it('+++ Reducer DISPATCH_TOTAL_COST should be return what is requested +++', () => {
		const expectedData = 30;
		
		expect(
			TotalCostReducer([], {
				type: DISPATCH_TOTAL_COST,
				payload: expectedData
			}))
			.toEqual(expectedData);
	});
});