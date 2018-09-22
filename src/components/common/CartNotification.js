import React from "react";

const CartNotification = props => {
	const {
		totalItems,
		className
	} = props;
	const cartTotal = totalItems > 9 ? '9+' : totalItems;
    
	return <div className={`${className} ${totalItems === 0 ? 'hidden' : ''}`}>{cartTotal}</div>;
};

export { CartNotification };
