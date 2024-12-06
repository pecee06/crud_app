// Displays the main content based on auth status of user
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { host } from "./constants.js";
import { updateDets, login } from "./redux/user.slice.js";
import { Header } from "./components";
import { Home } from "./pages";

const App = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!localStorage.getItem("uname")) navigate("auth");
		else {
			fetch(`${host}/api/user`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ uname: localStorage.getItem("uname") })
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.success) dispatch(updateDets(data.dets));
					else alert(data.message);
				})
				.catch((error) => console.error(error))
				.finally(() => dispatch(login(localStorage.getItem("uname"))));
		}
	}, []);

	return (
		<main
			className="poppins-regular"
			style={{
				display: "flex",
				flexDirection: "column"
			}}
		>
			<Header />
			<Home />
		</main>
	);
};

export default App;
