import React from 'react';
import { Button } from './Button';

const CartFooter = props => {
	let fixedCost = parseFloat((props.totalCartCost - props.totalCartDiscount).toFixed(2));
	
	const buttonProps = {
		className: `button__checkout ${props.myCartList.length === 0 ? 'hidden' : ''}`,
		value: `Checkout (${props.myCartList.length})`
	};
	
	return (
		<div className={props.className}>
			<div>
				<span>
					<label>Total Cost:</label>
					${fixedCost}
				</span>
				<Button {...buttonProps}/>
			</div>
		</div>
	);
};

export { CartFooter };