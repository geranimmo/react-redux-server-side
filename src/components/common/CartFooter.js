import React from 'react';
import { Button } from './Button';

const CartFooter = props => {
	const fixedCost = Math.round((props.totalCartCost - props.totalCartDiscount) * 1e12) / 1e12;
	const buttonProps = {
		className: 'button__checkout',
		value: `Checkout (${props.myCartList.length})`
	};
	console.log(props);
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