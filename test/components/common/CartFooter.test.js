import React from 'react';
import { shallow } from 'enzyme';
import { CartFooter } from '../../../src/components/common';

describe('>>> C A R T  F O O T E R ---- Test Snapshot <<<', () => {
	let wrapper;
	const propsValue = {
		totalCartCost: 300,
		totalCartDiscount: 10,
		myCartList: [
			{ id: 'Default', buy_time: 1537425742948 },
			{ id: 'Standout', buy_time: 1537425742148 }
		],
		className: 'footer__classes'
	};
	const priceValue = propsValue.totalCartCost - propsValue.totalCartDiscount;

	beforeEach(() => {
		wrapper = shallow(<CartFooter {...propsValue} />);
	});
       
	it('+++ Contains props that assigned to the component +++', () => {
		const targetComponent = wrapper.find(`div.${propsValue.className}`).prop('className');

		expect(targetComponent).toEqual(propsValue.className);
	});
    
	it('+++ Contains HTML structure of Price in the component +++', () => {
		const targetComponent = wrapper.shallow().find('span').text();

		expect(targetComponent).toEqual(`Total Cost:$${priceValue}`);
	});
});