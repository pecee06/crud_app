import { Button, Logo } from "./";
import { logout } from "../redux/user.slice";

const Header = () => {
	return (
		<header
			style={{
				display: "flex",
				justifyContent: "space-evenly",
				padding: "0.5vmax 2vmax"
			}}
		>
			<Logo />
			<Button>Logout</Button>
		</header>
	);
};

export default Header;
