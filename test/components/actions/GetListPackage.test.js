import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../src/components/actions';
import * as types from '../../../src/components/actions/types';
import * as reducers from '../../../src/components/reducers';
import ListPackages from '../../../src/assets/json/packages__.json';

const createMockStore = configureMockStore([thunk]);

describe('>>> A C T I O N ---- Test GetListPackage Actions <<<', () => {
	it('+++ Action getListPackage +++', () => {
		const expectedDatas = ListPackages;
		const store = createMockStore(reducers.Packages);
		store.dispatch(actions.getListPackage());
		const dispatchedActions = store.getActions();

		expect(dispatchedActions).toEqual([{
			type: types.DISPATCH_PACKAGES_LIST,
			payload: expectedDatas
		}]);
	});
});