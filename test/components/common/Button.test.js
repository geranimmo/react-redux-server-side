import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '../../../src/components/common';

describe('>>> B U T T O N ---- Test Snapshot <<<', () => {
	let wrapper;
	const propsValue = {
		value: 'Test button',
		id: 'buttonId'
	};

	beforeEach(() => {
		wrapper = shallow(<Button {...propsValue} />);
	});
       
	it('+++ Contains props that assigned to the component +++', () => {
		const targetComponent = wrapper.find(`button#${propsValue.id}`).prop('value');

		expect(targetComponent).toEqual(propsValue.value);
	});
});