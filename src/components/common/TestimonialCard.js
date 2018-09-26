import React from 'react';

const TestimonialCard = props => {
	const { TestimonialWrapper } = styles;
    
	return (
		<div style={TestimonialWrapper} className={props.className}>
			{props.children}
		</div>
	);
};

// sample of inline style
const styles = {
	TestimonialWrapper: {
		display: 'inline-block'
	}
};

export { TestimonialCard };