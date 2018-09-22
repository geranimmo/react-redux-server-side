import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import PackageSlider from '../../src/components/login';
import reducers from '../../src/components/reducers';
import ListPackages from '../../src/assets/json/packages__.json';

describe('>>> P A C K A G E S  L I S T ---- Test & Snapshot <<<', () => {
	const store = createStore(reducers, {}, applyMiddleware(thunk));
	let wrapper;

	beforeEach(() => {
		wrapper = mount(
			<Provider store={store}>
				<Router>
					<PackageSlider packagesList={ListPackages}/>
				</Router>
			</Provider>
		);
	});

	it('+++ Render the PackageSlider component', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('+++ Capturing Snapshot of PackageSlider component +++', () => {
		const renderedValue = renderer.create(
			<Provider store={store}>
				<Router>
					<PackageSlider packagesList={ListPackages}/>
				</Router>
			</Provider>
		).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});
});