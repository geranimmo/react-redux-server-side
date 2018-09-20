import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../src/components/login';

describe('>>> L O G I N ---- Test Snapshot <<<', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Login formId={'signInForm'} />);
	});

	it('+++ Render the DUMB component +++', () => {
		expect(wrapper.length).toEqual(1);
	});
       
	it('+++ Contains props that assigned to the component +++', () => {
		const targetComponent = wrapper.find('form').prop('id');

		expect(targetComponent).toEqual('signInForm');
	});
});