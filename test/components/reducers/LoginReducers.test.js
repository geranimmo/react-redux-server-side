import LoginReducer from '../../../src/components/reducers/LoginReducers';
import { DISPATCH_LOGIN } from '../../../src/components/actions/types';

describe('>>> R E D U C E R S ---- Test LoginReducers <<<', () => {
	it('+++ Reducer DISPATCH_LOGIN should be return what is requested +++', () => {
		expect(
			LoginReducer(false, {
				type: DISPATCH_LOGIN,
				payload: true
			}))
			.toEqual(true);
	});
});