import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../src/components/actions';
import * as types from '../../../src/components/actions/types';
import * as reducers from '../../../src/components/reducers';
import ListTestimonials from '../../../src/assets/json/testimonials__.json';

const createMockStore = configureMockStore([thunk]);

describe('>>> A C T I O N ---- Test GetListTestimonial Actions <<<', () => {
	it('+++ Action getListTestimonial +++', () => {
		const expectedDatas = ListTestimonials;
		const store = createMockStore(reducers.Testimonials);
		store.dispatch(actions.getListTestimonial());
		const dispatchedActions = store.getActions();

		expect(dispatchedActions).toEqual([{
			type: types.DISPATCH_TESTIMONIAL_LIST,
			payload: expectedDatas
		}]);
	});
});