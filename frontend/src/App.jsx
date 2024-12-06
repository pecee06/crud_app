// Displays the main content based on auth status of user
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { host } from "./constants.js";
import { updateDets, login } from "./redux/user.slice.js";

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
				.then((data) => dispatch(updateDets(data.dets)))
				.catch((error) => console.error(error))
				.finally(() => dispatch(login(localStorage.getItem("uname"))));
		}
	}, []);

	return <main></main>;
};

export default App;
