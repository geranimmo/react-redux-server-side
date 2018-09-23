import React from "react";
import { SubstringText } from './SubstringText';
import { DateTimeConverter } from './DateTimeConverter';

const CartItem = props => {
	return (
		<div className={props.className}>
			<div className={`cart__info__wrapper`}>
				<div className={`cart__info`}>
					<h1>
						{props.item.package_name}
						<label className={`info__recommended ${props.item.package_recommend ? '' : 'hidden'}`}>RECOMMENDED</label>
					</h1>
					<h2>
						<SubstringText
							text={props.item.package_description}
							textMaxLength={80}
						/>
					</h2>
					<span className={`info__datetime`}>
						<DateTimeConverter time={props.item.buy_time}/>
					</span>
					<span className={`info__price`}>${props.item.package_price}</span>
				</div>
			</div>
			<div
				id={`${props.item.id}__${props.item.buy_time}`}
				className={`cart__delete`}
				onClick={props.removeCartItems}
			>
				<svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
					<path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"/>
				</svg>
			</div>
		</div>
	);
};

export { CartItem };

