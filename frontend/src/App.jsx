// Displays the main content based on auth status of user
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
	const navigate = useNavigate();
	let loggedIn = false;
	useEffect(() => {
		if (!loggedIn) navigate("auth");
	}, []);
	return <p>App</p>;
};

export default App;
