import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { CartItem } from '../../../src/components/common';

describe('>>> C A R T  L I S T  I T E M ---- Test & Snapshot <<<', () => {
	let wrapper;
	const propsValue = {
		id: `Cart__Item__List`,
		className: `cart__list__wrapper`,
		item: {
			id: "Classic",
			package_id: "Classic",
			package_name: "Classic",
			package_recommend: false,
			package_description: "Classic Ad Lorem Ipsum is simply dummy text of the printing and typesetting",
			package_price: 269.99,
			package_image: "/assets/images/employeer-image-sample.jpg",
			buy_time: 1537425742948
		}
	};

	beforeEach(() => {
		wrapper = shallow(<CartItem {...propsValue}/>);
	});
       
	it('+++ Should contains props that assigned +++', () => {
		const targetComponent = wrapper.find(`div.${propsValue.className}`).prop('className');
		expect(targetComponent).toContain(`${propsValue.className}`);
	});
    
	it('+++ Should hide Recommended label if package_recommend is false +++', () => {
		expect(wrapper.find('.info__recommended').prop('className')).toContain('hidden');
	});

	it('+++ Capturing Snapshot of CartItem +++', () => {
		const renderedValue = renderer.create(<CartItem {...propsValue}/>).toJSON();
		expect(renderedValue).toMatchSnapshot();
	});
});