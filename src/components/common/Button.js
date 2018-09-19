import React from "react";

const Button = props => {
	return <button type="button" {...props}>{props.value}</button>;
};

export { Button };
