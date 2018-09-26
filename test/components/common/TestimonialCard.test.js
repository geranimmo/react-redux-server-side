import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { TestimonialCard } from '../../../src/components/common';

describe('>>> T E S T I M O N I A L  C A R D ---- Test & Snapshot <<<', () => {
	let wrapper;
	const propsValue = {
		className: 'test__class__props'
	};
	const childText = 'test children';

	beforeEach(() => {
		wrapper = shallow(
			<TestimonialCard {...propsValue}>{childText}</TestimonialCard>
		);
	});
       
	it('+++ Contains props that assigned to the component +++', () => {
		const targetComponent = wrapper.find(`.${propsValue.className}`);

		expect(targetComponent.length).toBe(1);
		expect(targetComponent.text()).toContain(childText);
	});

	it('+++ Capturing Snapshot of TestimonialCard +++', () => {
		const renderedValue = renderer.create(
			<TestimonialCard {...propsValue}>
				<span>childText</span>
			</TestimonialCard>
		).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});
});