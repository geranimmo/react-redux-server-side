import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { CartNotification } from '../../../src/components/common';

describe('>>> C A R T  N O T I F I C A T I O N ---- Test & Snapshot <<<', () => {
	let wrapper;
	const propsValue = {
		className: `cart__notif`,
		totalItems: 10
	};

	beforeEach(() => {
		wrapper = shallow(<CartNotification {...propsValue}/>);
	});
       
	it('+++ Contains props that assigned and display total text 9+ +++', () => {
		const targetComponent = wrapper.find(`div.${propsValue.className}`).prop('className');

		expect(targetComponent).toContain(`${propsValue.className}`);
		expect(wrapper.find(`div.${propsValue.className}`).text()).toBe('9+');
	});
    
	it('+++ Should contain hidden in className props if total is 0 +++', () => {
		const sampleValue = {
			className: `cart__notif`,
			totalItems: 0
		};
		const sampleWrapper = shallow(<CartNotification {...sampleValue}/>);
		const targetComponent = sampleWrapper.find(`div.${propsValue.className}`).prop('className');

		expect(targetComponent).toContain('hidden');
	});

	it('+++ Capturing Snapshot of CartNotification +++', () => {
		const renderedValue = renderer.create(<CartNotification {...propsValue}/>).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});
});