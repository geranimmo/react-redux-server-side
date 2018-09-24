import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const matchMedia = () => ({
	matches: false,
	addListener() {},
	removeListener() {}
});
window.matchMedia = window.matchMedia || matchMedia;
window.alert = (msg) => { console.log(msg); };
Enzyme.configure({ adapter: new Adapter() });

