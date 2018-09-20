import PackageReducer from '../../../src/components/reducers/PackageReducers';
import { DISPATCH_PACKAGES_LIST } from '../../../src/components/actions/types';
import ListPackages from '../../../src/assets/json/packages__.json';

describe('>>> R E D U C E R S ---- Test PackageReducers <<<', () => {
	it('+++ Reducer DISPATCH_PACKAGES_LIST should be return what is requested +++', () => {
		expect(
			PackageReducer([], {
				type: DISPATCH_PACKAGES_LIST,
				payload: ListPackages
			}))
			.toEqual(ListPackages);
	});
});