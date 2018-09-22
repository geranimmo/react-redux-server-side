const SubstringText = props => {
	return props.text.length > props.textMaxLength ?
		props.text.substring(0, props.textMaxLength)+'...'
		:
		props.text;
};

export { SubstringText };