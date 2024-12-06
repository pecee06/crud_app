import { logo } from "../assets";

const Logo = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				gap: "0.5vmax"
			}}
		>
			<span
				style={{
					fontSize: "1.5vmax",
					fontWeight: "bold"
				}}
			>
				Contacts
			</span>
			<img
				width={30}
				height={30}
				src={logo}
				alt="Logo Icon"
			/>
		</div>
	);
};

export default Logo;
