import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Header } from '../../src/components/header';

describe('>>> H E A D E R ---- Test & Snapshot <<<', () => {
	let wrapper;

	const propHeader = {
		onCart: true,
		ShoppingCart: [
			{ id: 'Classic', buy_time: 1537425742947 },
			{ id: 'Premium', buy_time: 1537425742948 }
		],
		Profile: {
			client_id: 1,
			first_name: "Default",
			last_name: "Client",
			business_name: "Default",
			phone_number: "+612529291002",
			client_logo: "client-default-logo.png",
			client_special: []
		},
		UserLogin: true
	};

	beforeEach(() => {
		wrapper = shallow(
			<Router>
				<Header {...propHeader}/>
			</Router>
		);
	});

	it('+++ Render the DUMB component of Header +++', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('+++ Capturing Snapshot of Header +++', () => {
		
		const renderedValue = renderer.create(
			<Router>
				<Header {...propHeader}/>
			</Router>
		).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});
});