import { themeGreen } from "../constants";

const Input = ({
	children,
	type = "text",
	placeholder = "",
	style = {},
	...props
}) => {
	return (
		<div className="open-sans">
			<input
				type={type}
				placeholder={placeholder}
				style={{
					padding: "0.5vmax 1vmax",
					borderRadius: "5px",
					border: `1px solid ${themeGreen}`,
					outline: "none",
					...style
				}}
				{...props}
			/>
			<span> {children}</span>
		</div>
	);
};

export default Input;
