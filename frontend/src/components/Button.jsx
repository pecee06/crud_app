const Button = ({ onclick, style = {}, children }) => {
	return (
		<button
			style={{
				padding: "1vmax 3vmax",
				outline: "none",
				border: "none",
				borderRadius: "10px",
				cursor: "pointer",
				...style
			}}
			className="open-sans"
			onClick={onclick}
		>
			{children}
		</button>
	);
};

export default Button;
