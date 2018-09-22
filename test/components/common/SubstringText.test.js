import { SubstringText } from '../../../src/components/common';

describe('>>> S U B S T R I N G  T E X T  F U N C T I O N ---- Test & Snapshot <<<', () => {
	it('+++ Should cut the text from begining to max length in props +++', () => {
		const propsValue = {
			text: 'Lorem Ipsum Dolor is simply dummy text of the printing and typesetting',
			textMaxLength: 20
		};

		expect(SubstringText({...propsValue})).toEqual('Lorem Ipsum Dolor is...');
	});
});