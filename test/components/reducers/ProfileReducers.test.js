import ProfileReducer from '../../../src/components/reducers/ProfileReducers';
import { DISPATCH_PROFILE_DATA } from '../../../src/components/actions/types';

describe('>>> R E D U C E R S ---- Test ProfileReducers <<<', () => {
	it('+++ Reducer DISPATCH_PROFILE_DATA should be return what is requested +++', () => {
		const loginData = {
			username: 'client@default.com',
			password: 'default123'
		};
		
		expect(
			ProfileReducer([], {
				type: DISPATCH_PROFILE_DATA,
				payload: loginData
			}))
			.toEqual(loginData);
	});
});