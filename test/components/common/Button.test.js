import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Button } from '../../../src/components/common';

describe('>>> B U T T O N ---- Test & Snapshot <<<', () => {
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

	it('+++ Capturing Snapshot of Button +++', () => {
		const renderedValue = renderer.create(<Button {...propsValue}/>).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});
});