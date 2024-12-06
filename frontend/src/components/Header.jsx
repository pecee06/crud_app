import { Button, Logo } from "./";
import { logout } from "../redux/user.slice";
import { host } from "../constants";
import { useDispatch } from "react-redux";
import { themeLightGray, themeBlue } from "../constants";

const Header = () => {
	const dispatch = useDispatch();

	return (
		<header
			style={{
				display: "flex",
				justifyContent: "space-between",
				padding: "1vmax 4vmax",
				backgroundColor: themeLightGray
			}}
		>
			<Logo />
			<Button
				style={{
					backgroundColor: "white",
					border: `1px solid ${themeBlue}`
				}}
				onclick={() => {
					fetch(`${host}/api/logout`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							uname: localStorage.getItem("uname")
						})
					})
						.then((res) => res.json())
						.then((data) => {
							if (data.success) dispatch(logout());
							else alert(data.message);
						})
						.catch((error) => console.error(error))
						.finally(() => location.reload());
				}}
			>
				Logout
			</Button>
		</header>
	);
};

export default Header;
