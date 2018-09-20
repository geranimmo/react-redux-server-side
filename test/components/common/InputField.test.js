import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { InputField } from '../../../src/components/common';

describe('>>> I N P U T ---- Test & Snapshot <<<', () => {
	let wrapper;
	const propsValue = {
		value: 'This is input component',
		type: 'text'
	};

	beforeEach(() => {
		wrapper = shallow(<InputField {...propsValue}/>);
	});
       
	it('+++ Contains props that assigned to the component +++', () => {
		const targetComponent = wrapper.find(`input[type="${propsValue.type}"]`).prop('value');

		expect(targetComponent).toEqual(propsValue.value);
	});

	it('+++ Capturing Snapshot of InputField +++', () => {
		const renderedValue = renderer.create(<InputField {...propsValue}/>).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});
});